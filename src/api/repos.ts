import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { gql } from 'graphql-request'
import { graphqlBaseQueryFn } from 'utils/graphqlBaseQueryFn'
import { Repository } from 'types/api'

export const REPOS_TYPE = 'REPOS_TYPE'

export const ReposQueries = createApi({
  reducerPath: REPOS_TYPE,
  baseQuery: graphqlBaseQueryFn(),
  tagTypes: [REPOS_TYPE],
  endpoints: build => ({
    getTypescriptReposList: build.query<Repository[], void>({
      query: () => ({
        document: gql`
          query {
            search(first: 10, type: REPOSITORY, query: "language:typescript sort:stars-desc") {
              nodes {
                ... on Repository {
                  id
                  name
                  url
                  description
                }
              }
            }
          }
        `,
      }),
      transformResponse: (response: { search: { nodes: Repository[] } }) => response.search.nodes,
    }),
  }),
})
