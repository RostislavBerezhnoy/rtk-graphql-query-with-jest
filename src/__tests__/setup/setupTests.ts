/* eslint-disable import/no-extraneous-dependencies */
import 'whatwg-fetch'
import createFetchMock from 'vitest-fetch-mock'
import { vi } from 'vitest'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()
