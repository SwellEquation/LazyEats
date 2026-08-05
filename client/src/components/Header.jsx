import './Header.css'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Recipes', path: '/' },
  { label: 'Weight Tracker', path: '/tracker' },
  { label: 'Meals & Ingredients', path: '/foods-nutrients' },
  { label: 'Profile', path: '/profile' },
]

function Header({ isLoggedIn, user }) {
  const location = useLocation()
  const avatarUrl = user?.avatarurl || user?.avatar_url || user?.avatarUrl
  const avatarAlt = user?.username ? `${user.username} avatar` : 'User avatar'

  return (
    <div className={`topbar ${!isLoggedIn ? 'logged-out' : ''}`}>
      <Link to='/' className="logo-link">
        <div className="logo">Lazy<span> Eat</span></div>
      </Link>
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
      {isLoggedIn && avatarUrl && (
        <Link to="/profile" className="avatar-link" aria-label="Go to profile">
          <img className="avatar" src={avatarUrl} alt={avatarAlt} referrerPolicy="no-referrer" />
        </Link>
      )}
    </div>
  )
}

export default Header
