import { FC } from 'react'
import { Repository } from 'types/api'

export type ReposListProps = {
  list: Repository[]
}

export const ReposList: FC<ReposListProps> = ({ list }) => (
  <>
    {list.map(({ id, name, url, description }) => (
      <div key={id} className='cards-container'>
        <div className='card'>
          <figure className='card-figure'>
            <img src='/assets/github-logo.webp' alt='' />
          </figure>
          <div className='card-body'>
            <a href={url} className='card-title' target='_blank' rel='noopener noreferrer'>
              {name}
            </a>
            <p className='card-text'>{description}</p>
          </div>
        </div>
      </div>
    ))}
  </>
)
