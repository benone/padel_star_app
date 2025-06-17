#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Generating GraphQL schema and types...\n');

// Run codegen
exec('npm run codegen', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr && !stderr.includes('DeprecationWarning')) {
    console.error(`❌ Error: ${stderr}`);
    return;
  }
  
  console.log(stdout);
  
  // Check if files were generated
  const schemaPath = path.join(process.cwd(), 'graphql.schema.json');
  const typesPath = path.join(process.cwd(), 'src/generated/graphql.tsx');
  
  if (fs.existsSync(schemaPath) && fs.existsSync(typesPath)) {
    const schemaSize = (fs.statSync(schemaPath).size / 1024).toFixed(2);
    const typesSize = (fs.statSync(typesPath).size / 1024).toFixed(2);
    
    console.log('\n✅ GraphQL schema and types generated successfully!');
    console.log(`📄 Schema: graphql.schema.json (${schemaSize} KB)`);
    console.log(`📄 Types: src/generated/graphql.tsx (${typesSize} KB)`);
    console.log('\n💡 Tip: You can now:');
    console.log('   - Import types from "src/generated/graphql"');
    console.log('   - Create GraphQL queries in src/graphql/*.graphql files');
    console.log('   - Run "npm run codegen:watch" to auto-generate on changes');
  } else {
    console.error('❌ Failed to generate files');
  }
});