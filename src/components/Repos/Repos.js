import React, {PropTypes} from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './Repos.scss'

export const Repos = ({list, activeId, onRepoClick}) => (
  <ListGroup>
      {list && list.map((repo) => (
          <ListGroupItem
              href="#"
              active={repo.id == activeId}
              onClick={onRepoClick(repo.id)}
          >
              {repo.name} <span title="Open issues">({repo.openIssues})</span>
          </ListGroupItem>
      ))}
      {list && list.length === 0 &&
        <div>There is no repositories</div>
      }
  </ListGroup>
)

Repos.propTypes = {
    list : PropTypes.array,
    activeId : PropTypes.number,
    onRepoClick: PropTypes.func.isRequired,
}

export default Repos
