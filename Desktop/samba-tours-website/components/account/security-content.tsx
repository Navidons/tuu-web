"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const loginSessions = [
  {
    id: "1",
    device: "MacBook Pro",
    location: "Kampala, Uganda",
    browser: "Chrome",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    device: "iPhone 14",
    location: "Entebbe, Uganda",
    browser: "Safari",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    device: "Windows PC",
    location: "Jinja, Uganda",
    browser: "Edge",
    lastActive: "1 day ago",
    current: false,
  },
]

export default function SecurityContent() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earth-900">Security Settings</h1>
        <p className="text-earth-600 mt-1">Manage your account security and privacy settings</p>
      </div>

      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Password</h4>
                <p className="text-sm text-green-700">Strong password set</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-900">2FA</h4>
                <p className="text-sm text-yellow-700">Not enabled</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Email</h4>
                <p className="text-sm text-green-700">Verified</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Change Password</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input id="newPassword" type={showNewPassword ? "text" : "password"} placeholder="Enter new password" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Two-Factor Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-earth-900">Enable 2FA</h4>
              <p className="text-sm text-earth-600 mt-1">
                Add an extra layer of security to your account with two-factor authentication
              </p>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-forest-50 rounded-lg">
              <p className="text-sm text-forest-700 mb-3">Scan this QR code with your authenticator app:</p>
              <div className="w-32 h-32 bg-white border-2 border-forest-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-earth-500">QR Code</span>
              </div>
              <div className="mt-3">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <div className="flex space-x-2 mt-1">
                  <Input id="verificationCode" placeholder="Enter 6-digit code" className="flex-1" />
                  <Button>Verify</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Login Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-earth-900">Email notifications for new logins</h4>
              <p className="text-sm text-earth-600 mt-1">
                Get notified when someone logs into your account from a new device
              </p>
            </div>
            <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Active Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loginSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-forest-50 rounded-lg">
                    <Smartphone className="h-5 w-5 text-forest-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-earth-900">{session.device}</h4>
                      {session.current && <Badge variant="secondary">Current</Badge>}
                    </div>
                    <p className="text-sm text-earth-600">
                      {session.browser} • {session.location}
                    </p>
                    <p className="text-xs text-earth-500">{session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    End Session
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline">End All Other Sessions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
