#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GENERATED_FILE = path.join(process.cwd(), 'src/generated/graphql.tsx');
const OUTPUT_DIR = path.join(process.cwd(), 'src/generated');

// Create output directories
const dirs = ['types', 'operations', 'hooks'];
dirs.forEach(dir => {
  const dirPath = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('📦 Splitting GraphQL generated file...\n');

try {
  const content = fs.readFileSync(GENERATED_FILE, 'utf8');
  const lines = content.split('\n');
  
  // Extract imports
  const imports = [];
  let i = 0;
  while (i < lines.length && (lines[i].startsWith('import') || lines[i].startsWith('export type Maybe') || lines[i].trim() === '')) {
    if (lines[i].trim()) {
      imports.push(lines[i]);
    }
    i++;
  }
  
  // Common imports for all files
  const commonImports = `import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as Apollo from '@apollo/client';
`;

  // Extract base types
  const baseTypes = [];
  const baseTypeNames = ['Maybe', 'InputMaybe', 'Exact', 'MakeOptional', 'MakeMaybe', 'MakeEmpty', 'Incremental', 'Scalars'];
  
  for (const line of lines) {
    for (const typeName of baseTypeNames) {
      if (line.startsWith(`export type ${typeName}`)) {
        baseTypes.push(line);
        break;
      }
    }
  }
  
  // Extract defaultOptions
  const defaultOptionsLine = lines.find(line => line.includes('const defaultOptions'));
  if (defaultOptionsLine) {
    baseTypes.push(defaultOptionsLine);
  }
  
  // Create base types file
  const baseTypesContent = `${commonImports}

${baseTypes.join('\n')}

export const defaultOptions = {} as const;
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'types/base.ts'), baseTypesContent);
  console.log('✅ Created: src/generated/types/base.ts');
  
  // Extract type definitions
  const typeDefinitions = {};
  const inputTypes = {};
  const payloadTypes = {};
  const enumTypes = {};
  
  let currentType = null;
  let currentContent = [];
  
  for (let j = i; j < lines.length; j++) {
    const line = lines[j];
    
    // Check for new type definition
    if (line.startsWith('export type ') || line.startsWith('export enum ')) {
      // Save previous type
      if (currentType && currentContent.length > 0) {
        const typeName = currentType.split(' ')[2];
        if (typeName.endsWith('Input')) {
          inputTypes[typeName] = currentContent.join('\n');
        } else if (typeName.endsWith('Payload')) {
          payloadTypes[typeName] = currentContent.join('\n');
        } else if (currentType.startsWith('export enum')) {
          enumTypes[typeName] = currentContent.join('\n');
        } else if (!typeName.includes('Query') && !typeName.includes('Mutation') && !typeName.includes('Variables')) {
          typeDefinitions[typeName] = currentContent.join('\n');
        }
      }
      
      currentType = line;
      currentContent = [line];
    } else if (currentType) {
      currentContent.push(line);
      
      // Check if type definition is complete
      if (line === '};' || (line === '}' && currentType.startsWith('export enum'))) {
        const typeName = currentType.split(' ')[2];
        if (typeName.endsWith('Input')) {
          inputTypes[typeName] = currentContent.join('\n');
        } else if (typeName.endsWith('Payload')) {
          payloadTypes[typeName] = currentContent.join('\n');
        } else if (currentType.startsWith('export enum')) {
          enumTypes[typeName] = currentContent.join('\n');
        } else if (!typeName.includes('Query') && !typeName.includes('Mutation') && !typeName.includes('Variables')) {
          typeDefinitions[typeName] = currentContent.join('\n');
        }
        currentType = null;
        currentContent = [];
      }
    }
  }
  
  // Create model types file
  const modelTypesContent = `import { Maybe, Scalars } from './base';

${Object.values(typeDefinitions).join('\n\n')}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'types/models.ts'), modelTypesContent);
  console.log('✅ Created: src/generated/types/models.ts');
  
  // Create input types file
  const inputTypesContent = `import { Maybe, InputMaybe, Scalars } from './base';

${Object.values(inputTypes).join('\n\n')}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'types/inputs.ts'), inputTypesContent);
  console.log('✅ Created: src/generated/types/inputs.ts');
  
  // Create payload types file
  const payloadTypesContent = `import { Maybe, Scalars } from './base';
import * as Models from './models';

${Object.values(payloadTypes).join('\n\n')}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'types/payloads.ts'), payloadTypesContent);
  console.log('✅ Created: src/generated/types/payloads.ts');
  
  // Create enum types file
  if (Object.keys(enumTypes).length > 0) {
    const enumTypesContent = `${Object.values(enumTypes).join('\n\n')}
`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'types/enums.ts'), enumTypesContent);
    console.log('✅ Created: src/generated/types/enums.ts');
  }
  
  // Extract operations and hooks
  const operations = {};
  const hooks = {};
  
  // Find all operations
  const operationRegex = /export type (\w+)(Query|Mutation)Variables[\s\S]*?export type \1\2HookResult[\s\S]*?export type \1\2Result[^;]*;/g;
  const matches = content.match(operationRegex) || [];
  
  matches.forEach(match => {
    const nameMatch = match.match(/export type (\w+)(Query|Mutation)Variables/);
    if (nameMatch) {
      const operationName = nameMatch[1] + nameMatch[2];
      operations[operationName] = match;
      
      // Extract the document
      const docRegex = new RegExp(`export const ${nameMatch[1]}Document = gql\\\`[\\s\\S]*?\\\`;`, 'g');
      const docMatch = content.match(docRegex);
      if (docMatch) {
        operations[operationName] = docMatch[0] + '\n\n' + operations[operationName];
      }
      
      // Extract hooks
      const hookRegex = new RegExp(`export function use${operationName}[\\s\\S]*?}\\s*export function use${operationName}LazyQuery[\\s\\S]*?}\\s*export function use${operationName}SuspenseQuery[\\s\\S]*?}`, 'g');
      const hookMatch = content.match(hookRegex);
      if (hookMatch) {
        hooks[operationName] = hookMatch[0];
      }
    }
  });
  
  // Create operations files
  Object.entries(operations).forEach(([name, content]) => {
    const isQuery = name.endsWith('Query');
    const dir = isQuery ? 'operations/queries' : 'operations/mutations';
    
    if (!fs.existsSync(path.join(OUTPUT_DIR, dir))) {
      fs.mkdirSync(path.join(OUTPUT_DIR, dir), { recursive: true });
    }
    
    const operationContent = `import { gql } from '@apollo/client';
import { Exact } from '../types/base';

${content}
`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, `${dir}/${name}.ts`), operationContent);
  });
  
  console.log(`✅ Created: ${Object.keys(operations).filter(n => n.endsWith('Query')).length} query files`);
  console.log(`✅ Created: ${Object.keys(operations).filter(n => n.endsWith('Mutation')).length} mutation files`);
  
  // Create hooks files
  Object.entries(hooks).forEach(([name, content]) => {
    const isQuery = name.endsWith('Query');
    const dir = isQuery ? 'hooks/queries' : 'hooks/mutations';
    
    if (!fs.existsSync(path.join(OUTPUT_DIR, dir))) {
      fs.mkdirSync(path.join(OUTPUT_DIR, dir), { recursive: true });
    }
    
    const hookContent = `import * as Apollo from '@apollo/client';
import { ${name}Document, ${name}Variables, ${name} } from '../../operations/${isQuery ? 'queries' : 'mutations'}/${name}';
import { defaultOptions } from '../../types/base';

${content}
`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, `${dir}/use${name}.ts`), hookContent);
  });
  
  console.log(`✅ Created: ${Object.keys(hooks).filter(n => n.endsWith('Query')).length} query hook files`);
  console.log(`✅ Created: ${Object.keys(hooks).filter(n => n.endsWith('Mutation')).length} mutation hook files`);
  
  // Create index files
  
  // Types index
  const typesIndexContent = `export * from './base';
export * from './models';
export * from './inputs';
export * from './payloads';
${Object.keys(enumTypes).length > 0 ? "export * from './enums';" : ''}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'types/index.ts'), typesIndexContent);
  console.log('✅ Created: src/generated/types/index.ts');
  
  // Operations index
  const queryExports = Object.keys(operations)
    .filter(n => n.endsWith('Query'))
    .map(n => `export * from './queries/${n}';`)
    .join('\n');
    
  const mutationExports = Object.keys(operations)
    .filter(n => n.endsWith('Mutation'))
    .map(n => `export * from './mutations/${n}';`)
    .join('\n');
    
  const operationsIndexContent = `${queryExports}
${mutationExports}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'operations/index.ts'), operationsIndexContent);
  console.log('✅ Created: src/generated/operations/index.ts');
  
  // Hooks index
  const queryHookExports = Object.keys(hooks)
    .filter(n => n.endsWith('Query'))
    .map(n => `export * from './queries/use${n}';`)
    .join('\n');
    
  const mutationHookExports = Object.keys(hooks)
    .filter(n => n.endsWith('Mutation'))
    .map(n => `export * from './mutations/use${n}';`)
    .join('\n');
    
  const hooksIndexContent = `${queryHookExports}
${mutationHookExports}
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'hooks/index.ts'), hooksIndexContent);
  console.log('✅ Created: src/generated/hooks/index.ts');
  
  // Main index file
  const mainIndexContent = `export * from './types';
export * from './operations';
export * from './hooks';
`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), mainIndexContent);
  console.log('✅ Created: src/generated/index.ts');
  
  console.log('\n✨ GraphQL file split completed successfully!');
  console.log('\nYou can now import from:');
  console.log('  - Types: import { Player, Club } from "@/src/generated/types"');
  console.log('  - Hooks: import { useGetPlayersQuery } from "@/src/generated/hooks"');
  console.log('  - Or all: import { Player, useGetPlayersQuery } from "@/src/generated"');
  
} catch (error) {
  console.error('❌ Error splitting GraphQL file:', error.message);
  process.exit(1);
}