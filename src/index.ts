import { GraphQLSchema } from 'graphql'

import { getSdk } from './generated/graphql'

import { StudioClient, Credential } from './StudioClient'
import { buildVariables } from './util'

export type PublishInput = {
  graph: string
  subgraph: string

  schema: string
  credential: Credential

  routing_url?: string
}

export async function publish(input: PublishInput) {
  const sdk = getSdk(new StudioClient(input.credential))

  const variables = await buildVariables(input)
  return sdk.SubgraphPublish(variables)
}
