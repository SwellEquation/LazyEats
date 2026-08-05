import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ id, title, cook_time_mins, est_cost }) => {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{title}</h3>
      </div>

      <div className="card-bottom">
        <p>{'Cook time: ' + cook_time_mins + ' mins'}</p>
        <p>{'Est. cost: $' + est_cost}</p>
        <Link to={'/dishes/' + id}>Read More →</Link>
      </div>
    </div>
  )
}

export default Card
