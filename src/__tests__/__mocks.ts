import { InvalidationState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { RootState } from 'store'
import { REPOS_TYPE } from 'api'
import { Repository } from 'types/api'

export const initialState: RootState = {
  [REPOS_TYPE]: {
    queries: {},
    mutations: {},
    provided: {} as InvalidationState<typeof REPOS_TYPE>,
    subscriptions: {},
    config: {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      online: true,
      focused: true,
      middlewareRegistered: false,
      reducerPath: 'REPOS_TYPE',
      keepUnusedDataFor: 60,
    },
  },
}

export const mockRepos: Repository[] = [
  {
    id: 'MDEwOlJlcG9zaXRvcnkyODQ1NzgyMw==',
    name: 'freeCodeCamp',
    url: 'https://github.com/freeCodeCamp/freeCodeCamp',
    description: "freeCodeCamp.org's open-source codebase and curriculum. Learn to code for free.",
  },
]
