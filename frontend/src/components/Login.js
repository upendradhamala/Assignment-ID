import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Loading from './Loading'
const Login = ({ history }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()
  useEffect(() => {
    isAuthenticated && history.push('/home')
  }, [isAuthenticated, history])
  return (
    <div className='signInOuter'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='signInLeft'>
            <button onClick={loginWithRedirect}>Login</button>
          </div>
          <div className='signInRight'>
            <img src='/Images/cover1.jpg' alt='' />
          </div>
        </>
      )}
    </div>
  )
}

export default Login
