/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'
import { ReposQueries } from 'api'
import { mockRepos } from './__mocks'
import { setupStore } from './setup/setupStore'
import { API_URL, ACCESS_TOKEN } from 'config'

const fetchMocker = createFetchMock(vi)

describe.skip('verify getTypescriptReposList endpoint', () => {
  beforeEach((): void => fetchMocker.resetMocks())

  test('request is correct', () => {
    const storeRef = setupStore(ReposQueries)
    fetchMocker.mockResponse(JSON.stringify({}))

    return storeRef.store
      .dispatch<any>(ReposQueries.endpoints.getTypescriptReposList.initiate())
      .then(() => {
        //TODO: fix later
        //It doesn't work because ReposQueries has a custom baseQuery. That's why the real api is called instead of fetchMocker
        expect(fetchMocker).toBeCalledTimes(1)
        const { method, headers, url } = fetchMocker.mock.calls[0][0] as Request

        const authorization = headers.get('Authorization')

        expect(method).toBe('POST')
        expect(url).toBe(API_URL)
        expect(authorization).toBe(`Bearer ${ACCESS_TOKEN}`)
      })
  })

  test('successful response', () => {
    const storeRef = setupStore(ReposQueries)
    fetchMocker.mockResponse(JSON.stringify(mockRepos))

    return storeRef.store
      .dispatch<any>(ReposQueries.endpoints.getTypescriptReposList.initiate())
      .then((action: any) => {
        const { status, /* data, */ isSuccess } = action
        expect(status).toBe('fulfilled')
        expect(isSuccess).toBe(true)
        //expect(data).toStrictEqual(mockRepos)
      })
  })

  test('unsuccessful response', () => {
    const storeRef = setupStore(ReposQueries)
    fetchMocker.mockReject(new Error('Internal Server Error'))

    return storeRef.store
      .dispatch<any>(ReposQueries.endpoints.getTypescriptReposList.initiate(undefined))
      .then((action: any) => {
        const { status, /* error, */ isError } = action
        expect(status).toBe('rejected')
        expect(isError).toBe(true)
        // expect(error).toBe('Error: Internal Server Error')
      })
  })
})
