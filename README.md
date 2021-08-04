# apollostudio-subgraph-publish

Utility for programatically publishing subgraphs to Apollo Studio on service start.

## Install

```sh
npm add apollostudio-subgraph-publish
```

## Usage

```typescript
import { publish } from 'apollostudio-subgraph-publish'

const schema = `
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`

const typeDefs = gql(schema)
const server = new ApolloServer({ typeDefs, resolvers })

async main() {
  await publish({
    graph: 'example-lyd9e@current',
    subgraph: 'users',
    schema,
    credential: { api_key: process.env.APOLLO_KEY! },
    routing_url: 'http://users.svc.cluster.local:4001/graphql',
  })

  const { url } = await server.listen()
  console.log(`🚀  Server ready at ${url}`)
}

main()
```
