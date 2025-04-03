"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function DatabaseAdmin() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      const response = await fetch('/api/db/status')
      const data = await response.json()
      setStatus(data)
      
      if (data.success) {
        setMessage('Database is connected and tables are set up correctly.')
      } else {
        setError('Database status check failed: ' + data.error)
      }
    } catch (error) {
      setError('Failed to check database status: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setLoading(false)
    }
  }

  const fixSchema = async () => {
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      const response = await fetch('/api/db/fix-schema')
      const data = await response.json()
      
      if (data.success) {
        setMessage('Schema fixes ' + (data.issues.length > 0 ? 'applied' : 'not needed') + ': ' + data.message)
        // Refresh status
        await checkStatus()
      } else {
        setError('Schema fix failed: ' + data.error)
      }
    } catch (error) {
      setError('Failed to fix schema: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setLoading(false)
    }
  }

  const reinitializeDatabase = async () => {
    if (!confirm('Are you sure you want to reinitialize the database? This will drop and recreate all tables.')) {
      return
    }
    
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      const response = await fetch('/api/db/reinit')
      const data = await response.json()
      
      if (data.success) {
        setMessage('Database reinitialized successfully: ' + data.message)
        // Refresh status
        await checkStatus()
      } else {
        setError('Database reinitialization failed: ' + data.error)
      }
    } catch (error) {
      setError('Failed to reinitialize database: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Database Administration</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Status Messages */}
          {message && (
            <Alert className="bg-green-50">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Database Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Database Status</CardTitle>
              <CardDescription>Current status of the database connection and schema</CardDescription>
            </CardHeader>
            <CardContent>
              {status ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Connection:</h3>
                    <p>{status.success ? 'Connected' : 'Not Connected'}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Tables:</h3>
                    <ul className="list-disc pl-4">
                      {status.tables ? (
                        status.tables.map((table: string) => (
                          <li key={table}>{table}</li>
                        ))
                      ) : (
                        <li>No tables found</li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>{loading ? 'Checking status...' : 'Status not available'}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={checkStatus} disabled={loading}>
                Refresh Status
              </Button>
            </CardFooter>
          </Card>

          {/* Database Management Card */}
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Perform database maintenance operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fix Schema Issues:</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Checks for schema issues and applies fixes if necessary.
                  </p>
                  <Button onClick={fixSchema} disabled={loading} className="mr-2">
                    Fix Schema
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Reinitialize Database:</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Warning: This will drop and recreate all tables. All data will be lost.
                  </p>
                  <Button variant="destructive" onClick={reinitializeDatabase} disabled={loading}>
                    Reinitialize Database
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Return to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 