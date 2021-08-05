import { GraphQLSchema } from 'graphql'

import { getSdk, SubgraphPublishMutation } from './generated/graphql'

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

export type PublishOutput = Pick<
  NonNullable<
    NonNullable<SubgraphPublishMutation['service']>['upsertImplementingServiceAndTriggerComposition']
  >,
  'errors' | 'didUpdateGateway' | 'serviceWasCreated'
> & {
  success: boolean
}

export async function publish(input: PublishInput): Promise<PublishOutput> {
  const sdk = getSdk(new StudioClient(input.credential))

  const variables = await buildVariables(input)
  const { service } = await sdk.SubgraphPublish(variables)

  if (service && service.upsertImplementingServiceAndTriggerComposition) {
    const {
      upsertImplementingServiceAndTriggerComposition: { errors, didUpdateGateway, serviceWasCreated },
    } = service
    const success = !errors.length
    return { success, errors, didUpdateGateway, serviceWasCreated }
  } else {
    return { success: false, errors: [], didUpdateGateway: false, serviceWasCreated: false }
  }
}
