"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Smartphone, Wifi, WifiOff, RefreshCw, Bell } from "lucide-react"

export function ProgressiveWebApp() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check if app is installed
    const checkIfInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true)
      }
    }
    checkIfInstalled()

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Service worker update detection
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true)
      })
    }

    // Check notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstallable(false)
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    }
  }

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration?.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" })
          window.location.reload()
        }
      })
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Smartphone className="mr-3 h-8 w-8 text-blue-600" />
          Progressive Web App
        </h1>
        <p className="text-gray-600">Mobile-first experience and offline capabilities</p>
      </div>

      {/* Connection Status */}
      <Alert className={isOnline ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <div className="flex items-center">
          {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
          <AlertDescription className="ml-2">
            {isOnline ? "You are online and connected" : "You are offline - some features may be limited"}
          </AlertDescription>
        </div>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Installation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              App Installation
            </CardTitle>
            <CardDescription>Install the app for the best experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isInstalled ? (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Installed
                </Badge>
                <span className="text-sm text-gray-600">App is installed</span>
              </div>
            ) : isInstallable ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Install this app on your device for quick access</p>
                <Button onClick={handleInstall} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Install App
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Installation not available on this device</p>
            )}
          </CardContent>
        </Card>

        {/* Update Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="mr-2 h-5 w-5" />
              App Updates
            </CardTitle>
            <CardDescription>Keep your app up to date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {updateAvailable ? (
              <div className="space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Update Available
                </Badge>
                <p className="text-sm text-gray-600">A new version is available</p>
                <Button onClick={handleUpdate} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Now
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Up to Date
                </Badge>
                <span className="text-sm text-gray-600">Latest version</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Stay updated with push notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationPermission === "granted" ? (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Enabled
                </Badge>
                <span className="text-sm text-gray-600">Notifications allowed</span>
              </div>
            ) : notificationPermission === "denied" ? (
              <div className="space-y-2">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Blocked
                </Badge>
                <p className="text-sm text-gray-600">Enable in browser settings</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Allow notifications for real-time updates</p>
                <Button onClick={requestNotificationPermission} variant="outline" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Enable Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* PWA Features */}
      <Card>
        <CardHeader>
          <CardTitle>Progressive Web App Features</CardTitle>
          <CardDescription>Modern web capabilities for a native app experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Mobile Optimized</p>
                <p className="text-xs text-gray-500">Responsive design</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <WifiOff className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Offline Support</p>
                <p className="text-xs text-gray-500">Works without internet</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Push Notifications</p>
                <p className="text-xs text-gray-500">Real-time alerts</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Download className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Installable</p>
                <p className="text-xs text-gray-500">Add to home screen</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
