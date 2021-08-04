import { GraphQLSchema } from 'graphql'

import { getSdk } from './generated/graphql'

import { StudioClient, Credential } from './StudioClient'
import { buildVariables } from './util'

export type PublishInput = {
  graph: string
  subgraph: string
  schema: string
  routing_url?: string

  credential: Credential

  use_git_context?: boolean
}

export async function publish(input: PublishInput) {
  const sdk = getSdk(new StudioClient(input.credential))

  const variables = await buildVariables(input)
  return sdk.SubgraphPublish(variables)
}
