"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Globe, Camera, Trash2 } from "lucide-react"

export default function SettingsContent() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+256 700 123 456",
    dateOfBirth: "1990-05-15",
    nationality: "Ugandan",
    address: "123 Main Street, Kampala",
    bio: "Adventure enthusiast and wildlife photographer",
    language: "en",
    timezone: "Africa/Kampala",
    currency: "USD",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    shareData: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earth-900">Account Settings</h1>
        <p className="text-earth-600 mt-1">Manage your personal information and account preferences</p>
      </div>

      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Profile Picture</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button>Upload New Picture</Button>
              <Button variant="outline">Remove Picture</Button>
              <p className="text-sm text-earth-600">JPG, PNG or GIF. Max size 5MB. Recommended 400x400px.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Select
                value={profileData.nationality}
                onValueChange={(value) => handleInputChange("nationality", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ugandan">Ugandan</SelectItem>
                  <SelectItem value="Kenyan">Kenyan</SelectItem>
                  <SelectItem value="Tanzanian">Tanzanian</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                  <SelectItem value="British">British</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </div>
          <div className="mt-6">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={profileData.language} onValueChange={(value) => handleInputChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profileData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Kampala">Africa/Kampala (EAT)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={profileData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="UGX">UGX (USh)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-earth-900">Public Profile</h4>
                <p className="text-sm text-earth-600">Make your profile visible to other users</p>
              </div>
              <Switch
                checked={privacySettings.profileVisibility}
                onCheckedChange={(checked) => handlePrivacyChange("profileVisibility", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-earth-900">Show Email</h4>
                <p className="text-sm text-earth-600">Display your email address on your profile</p>
              </div>
              <Switch
                checked={privacySettings.showEmail}
                onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-earth-900">Show Phone</h4>
                <p className="text-sm text-earth-600">Display your phone number on your profile</p>
              </div>
              <Switch
                checked={privacySettings.showPhone}
                onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-earth-900">Allow Messages</h4>
                <p className="text-sm text-earth-600">Allow other users to send you messages</p>
              </div>
              <Switch
                checked={privacySettings.allowMessages}
                onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-earth-900">Data Sharing</h4>
                <p className="text-sm text-earth-600">Share anonymized data for service improvement</p>
              </div>
              <Switch
                checked={privacySettings.shareData}
                onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <Trash2 className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700 mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="mt-3">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  )
}
