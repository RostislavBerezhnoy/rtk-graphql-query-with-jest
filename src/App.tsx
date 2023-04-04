import { ReposQueries } from 'api'
import { ReposList } from 'components/ReposList'

export function App() {
  const { useGetTypescriptReposListQuery } = ReposQueries

  const { data: repos = [], isLoading: isReposLoading } = useGetTypescriptReposListQuery()

  if (isReposLoading) return <h1 className='accessory-title'>Loading...</h1>

  if (repos?.length === 0) return <h1 className='accessory-title'>No data</h1>

  return (
    <div className='app-container'>
      <h2 className='welcome'>Welcome to my app</h2>
      <ReposList list={repos} />
    </div>
  )
}

export default App
