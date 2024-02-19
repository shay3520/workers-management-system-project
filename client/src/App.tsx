
import React from 'react'
import AppRouter from './Routing/AppRouter'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default App
