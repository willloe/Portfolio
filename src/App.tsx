import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from '@/routes'
import '@/styles/globals.css'
import { LoadingScreen } from '@/components/effects/loading-screen'
import { useState, useEffect } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
