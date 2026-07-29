import './Header.css'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Recipes', path: '/' },
  { label: 'Tracker', path: '/tracker' },
  { label: 'Ingredients', path: '/foods-nutrients' },
  { label: 'Profile', path: '/profile' },
]

function Header() {
  const location = useLocation()

  return (
    <div className="topbar">
      <Link to='/'><div className="logo">Lazy<span>Eats</span></div></Link>
      <div className="nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="avatar">L</div>
    </div>
  )
}

export default Header
