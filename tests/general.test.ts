import { readFileSync } from 'fs'

import { publish } from '../src'

test('query', async () => {
  expect(process.env.APOLLO_KEY).toBeDefined()

  const schema = readFileSync('./tests/products.graphql').toString()

  const data = await publish({
    graph: process.env.APOLLO_GRAPH || 'example-lyd9e@current',
    subgraph: 'products',
    schema,
    credential: { api_key: process.env.APOLLO_KEY! },
    routing_url: 'http://products.svc.cluster.local:4001/graphql',
  })

  expect(data).toBeDefined()
  expect(data.service).toBeDefined()
  expect(data.service!.upsertImplementingServiceAndTriggerComposition).toBeDefined()
  expect(data.service!.upsertImplementingServiceAndTriggerComposition!.errors).toHaveLength(0)
})
