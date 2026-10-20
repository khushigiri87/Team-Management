import React, { useState } from 'react'
import { getLocalStorage } from '../utils/localStorage'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState(() => {
    const { employees } = getLocalStorage()
    return employees || []
  })

  return (
    <AuthContext.Provider value={[userData, setuserData]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

