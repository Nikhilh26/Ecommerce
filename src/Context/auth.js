import React, { useEffect, useState, useContext, createContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setauth] = useState({
    user: null,
    token: ""
  })

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('auth'));
    if (item) setauth(item);
    console.log("Checking Item @context/auth.js")
    console.log(item);
  }, [])

  return (
    <AuthContext.Provider value={[auth, setauth]}>
      {children}
    </AuthContext.Provider>
  )
}

//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };