import ErrorNotification from './ErrorNotification'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, errorMessage }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default LoginForm
