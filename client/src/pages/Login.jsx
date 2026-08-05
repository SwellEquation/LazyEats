import './Login.css'

const Login = ({API_URL}) => {

    const AUTH_URL = `${API_URL}/auth/github`

    return (
        <div className='login-page'>
            <div className='login-top-row'>
                <h1 className='login-home-title'>Lazy Eat</h1>
            </div>
            <a href={AUTH_URL} className='login-link'>
                <button className="login-btn">Login via GitHub</button>
            </a>
        </div>
    )
}

export default Login