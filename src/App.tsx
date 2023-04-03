import { ReposQueries } from 'api'
import NxWelcome from 'components/NxWelcome'

export function App() {
  const { useGetTypescriptReposListQuery } = ReposQueries

  const { data: repos, isLoading: isReposLoading } = useGetTypescriptReposListQuery()

  console.log(isReposLoading, repos)

  return (
    <div>
      <NxWelcome title='rtk-graphql-query-with-jest-and-vite' />
    </div>
  )
}

export default App
