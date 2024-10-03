'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Smartphone, Lock } from "lucide-react"

export default function LoginComponent() {
  const [mobileno, setMobileno] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateMobile = (mobileno) => {
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(mobileno);
  }

  const handleSubmit = async (e) => {
    sessionStorage.setItem('userLoggedin', false)
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(
        `https://qualifit.top/App/api.php?gofor=login&mobileno=${(mobileno)}&password=${(password)}`,
        { method: 'GET' }
      )
      const data = await response.json()

      if (data.status === 'success') {
        sessionStorage.setItem('userLoggedin', true)
        router.push('/dashboard')
      } else {
        setError(data.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      sessionStorage.setItem('userLoggedin', false)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    (<div
      className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your Details</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive"> 
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="mobileno">Mobile Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="mobileno"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  required
                  value={mobileno}
                  onChange={(e) => setMobileno(e.target.value)}
                  className="pl-10"
                  aria-invalid={error ? 'true' : 'false'} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  aria-invalid={error ? 'true' : 'false'} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>)
  );
}