# GraphQL Setup

This project uses GraphQL with Apollo Client to connect to the Padel Star Club API.

## Commands

- `npm run codegen` - Generate GraphQL types and schema
- `npm run codegen:watch` - Watch for changes and regenerate

## Usage

### 1. Create a GraphQL query/mutation

Create a `.graphql` file in this directory:

```graphql
# src/graphql/users.graphql
query GetUsers {
  users {
    id
    name
    email
  }
}

mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
```

### 2. Run codegen

```bash
npm run codegen
```

### 3. Use generated hooks in your components

```tsx
import { useGetUsersQuery, useCreateUserMutation } from '@/src/generated/graphql';

export function UsersList() {
  const { data, loading, error } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data?.users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

## API Endpoint

- GraphQL Endpoint: https://api.padelstarclub.ru/graphql
- Schema: See `graphql.schema.json` in the project root

## Generated Files

- `src/generated/graphql.tsx` - TypeScript types and React hooks
- `graphql.schema.json` - Full GraphQL schema (for reference)