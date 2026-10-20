import React, { useContext, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      try {
        const parsed = JSON.parse(loggedInUser)
        if (parsed.role === "employees") {
          const employees = JSON.parse(localStorage.getItem("employees")) || []
          const exists = employees.some((e) => e.id === parsed.data?.id || e.email?.toLowerCase() === parsed.data?.email?.toLowerCase())
          if (!exists) {
            localStorage.removeItem("loggedInUser")
            return null
          }
        }
        return parsed.role
      } catch {
        return null
      }
    }
    return null
  })

  const [loggedInUserData, setLoggedInUserData] = useState(() => {
    const loggedInUser = localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      try {
        const parsed = JSON.parse(loggedInUser)
        if (parsed.role === "employees") {
          const employees = JSON.parse(localStorage.getItem("employees")) || []
          const current = employees.find((e) => e.id === parsed.data?.id || e.email?.toLowerCase() === parsed.data?.email?.toLowerCase())
          if (!current) {
            localStorage.removeItem("loggedInUser")
            return null
          }
          return current
        }
        return parsed.data
      } catch {
        return null
      }
    }
    return null
  })

  const [userData] = useContext(AuthContext)


  const handleLogin = (email, password) => {
    if (
      (email === "admin@me.com" || email === "khushi@gmail.com" || email === "khushigiri@gmail.com") &&
      (password === "123" || password === "khushi@123" || password === "admin123")
    ) {

      const adminUser = {
        id: 1,
        firstName: "Khushi Giri",
        email: email
      }

      setUser("admin")
      setLoggedInUserData(adminUser)

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "admin",
          data: adminUser
        })
      )
    }
    else {
      const allEmployees = JSON.parse(localStorage.getItem("employees")) || userData || []
      const emp = allEmployees.find(
        (e) => e.email.toLowerCase() === email.trim().toLowerCase() && e.password === password
      )

      if (emp) {
        setUser("employees")
        setLoggedInUserData(emp)

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employees",
            data: emp
          })
        )
      } else {
        alert("Invalid Credentials")
      }
    }
  }

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && (
        <AdminDashboard changeUser = {setUser} data={loggedInUserData} />
      )}

      {user === "employees" && (
        <EmployeeDashboard changeUser = {setUser} data={loggedInUserData} />
      )}
    </>
  )
}

export default App