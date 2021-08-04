import { SubgraphPublishMutationVariables } from './generated/graphql'

import { PublishInput } from './'
import { GitContext } from './GitContext'
import { GraphRef } from './GraphRef'

export async function buildVariables(publishInput: PublishInput): Promise<SubgraphPublishMutationVariables> {
  const graphRef = new GraphRef(publishInput.graph)
  const git_context = publishInput.use_git_context ? new GitContext() : void 0
  if (git_context) await git_context.init()

  return {
    graph_id: graphRef.name,
    variant: graphRef.variant,
    subgraph: publishInput.subgraph,
    url: publishInput.routing_url,
    schema: {
      sdl: publishInput.schema,
    },
    git_context,
    revision: '',
  }
}
