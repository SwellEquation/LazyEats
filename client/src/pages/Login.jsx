const Login = ({API_URL}) => {

    const AUTH_URL = `${API_URL}/auth/github`

    return (
        <div className='Login'>
            <h1>LazyEat</h1>
            <center>
                <a href={AUTH_URL}>
                    <button className="headerBtn"> 🔒 Login via Github </button>
                </a>
            </center>
        </div>
    )
}

export default Login