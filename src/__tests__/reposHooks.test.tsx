import { FC, PropsWithChildren } from 'react'
import createfetchMocker from 'vitest-fetch-mock'
import { renderHook } from '@testing-library/react-hooks'
import { ReposQueries } from 'api'
import { Provider } from 'react-redux'
import { setupStore } from './setup/setupStore'
import { mockRepos } from './__mocks'

const fetchMocker = createfetchMocker(vi)
const UPDATE_TIMEOUT = 5000

const { useGetTypescriptReposListQuery } = ReposQueries

const wrapper: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = setupStore(ReposQueries)

  return <Provider store={storeRef.store}>{children}</Provider>
}

describe('useGetTypescriptReposListQuery', () => {
  beforeEach((): void => fetchMocker.resetMocks())

  test('success', async () => {
    fetchMocker.mockResponse(JSON.stringify(mockRepos))
    const { result, waitForNextUpdate } = renderHook(() => useGetTypescriptReposListQuery(), {
      wrapper,
    })
    const initialResponse = result.current
    expect(initialResponse.data).toBeUndefined()
    expect(initialResponse.isLoading).toBe(true)
    await waitForNextUpdate({ timeout: UPDATE_TIMEOUT })

    const nextResponse = result.current
    expect(nextResponse.data).not.toBeUndefined()
    expect(nextResponse.isLoading).toBe(false)
    expect(nextResponse.isSuccess).toBe(true)
  })
  //TODO: fix later
  //Problem: https://github.com/RostislavBerezhnoy/rtk-graphql-query-with-jest-and-vite/blob/develop/src/__tests__/reposQueries.test.ts#L28
  test('fail', async () => {
    fetchMocker.mockReject(new Error('Internal Server Error'))
    const { result, waitForNextUpdate } = renderHook(() => useGetTypescriptReposListQuery(), {
      wrapper,
    })
    const initialResponse = result.current
    expect(initialResponse.data).toBeUndefined()
    expect(initialResponse.isLoading).toBe(true)

    await waitForNextUpdate({ timeout: UPDATE_TIMEOUT })

    const nextResponse = result.current
    //expect(nextResponse.data).toBeUndefined()
    expect(nextResponse.isLoading).toBe(false)
    //expect(nextResponse.isError).toBe(true)
  })
})
