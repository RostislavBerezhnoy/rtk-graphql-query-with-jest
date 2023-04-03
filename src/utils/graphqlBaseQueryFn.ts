import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import { API_URL, ACCESS_TOKEN } from 'config'

export const graphqlBaseQueryFn = (apiUrl: string = API_URL): BaseQueryFn =>
  graphqlRequestBaseQuery({
    url: apiUrl,
    prepareHeaders: headers => {
      if (ACCESS_TOKEN) headers.set('Authorization', `Bearer ${ACCESS_TOKEN}`)

      return headers
    },
  })
