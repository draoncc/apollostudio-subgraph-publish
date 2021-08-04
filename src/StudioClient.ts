import { GraphQLClient } from 'graphql-request'

const STUDIO_PROD_API_ENDPOINT = 'https://graphql.api.apollographql.com/api/graphql'
const CLIENT_NAME = 'apollostudio-subgraph-publish'
const PKG_VERSION = '0.0.1'

export type Credential = {
  api_key: string
}

export class StudioClient extends GraphQLClient {
  constructor(credential: Credential) {
    super(STUDIO_PROD_API_ENDPOINT, {
      headers: {
        'apollographql-client-name': CLIENT_NAME,
        'apollographql-client-version': PKG_VERSION,
        'x-api-key': credential.api_key,
      },
    })
  }
}
