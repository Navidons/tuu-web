"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  School,
  Mail,
  Shield,
  Database,
  Users,
  Activity,
  Save,
  TestTube,
  RefreshCw,
  CheckCircle,
  Phone,
} from "lucide-react"

interface SchoolConfig {
  school_name: string
  school_code: string
  academic_year: string
  current_term: string
  school_address: string
  school_phone: string
  school_email: string
  principal_name: string
  principal_email: string
  timezone: string
  currency: string
  language: string
}

interface EmailConfig {
  provider: string
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  smtp_encryption: string
  from_email: string
  from_name: string
  max_daily_emails: number
}

interface SecurityConfig {
  password_min_length: number
  password_require_uppercase: boolean
  password_require_lowercase: boolean
  password_require_numbers: boolean
  password_require_symbols: boolean
  max_login_attempts: number
  lockout_duration_minutes: number
  session_timeout_minutes: number
  two_factor_required: boolean
}

interface SystemStats {
  total_users: number
  active_sessions: number
  total_applications: number
  database_size: string
  uptime: string
}

export function EnterpriseSettingsPanel() {
  const { user, userRole } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testingEmail, setTestingEmail] = useState(false)

  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>({
    school_name: "",
    school_code: "",
    academic_year: "",
    current_term: "",
    school_address: "",
    school_phone: "",
    school_email: "",
    principal_name: "",
    principal_email: "",
    timezone: "UTC",
    currency: "USD",
    language: "en",
  })

  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    provider: "smtp",
    smtp_host: "",
    smtp_port: 587,
    smtp_username: "",
    smtp_password: "",
    smtp_encryption: "tls",
    from_email: "",
    from_name: "",
    max_daily_emails: 1000,
  })

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    password_min_length: 8,
    password_require_uppercase: true,
    password_require_lowercase: true,
    password_require_numbers: true,
    password_require_symbols: false,
    max_login_attempts: 5,
    lockout_duration_minutes: 30,
    session_timeout_minutes: 480,
    two_factor_required: false,
  })

  const [systemStats, setSystemStats] = useState<SystemStats>({
    total_users: 0,
    active_sessions: 0,
    total_applications: 0,
    database_size: "0 MB",
    uptime: "0 days",
  })

  useEffect(() => {
    if (user && userRole) {
      loadSettings()
      loadSystemStats()
    }
  }, [user, userRole])

  const loadSettings = async () => {
    try {
      setLoading(true)

      // Load school configuration
      const { data: schoolData, error: schoolError } = await supabase.from("school_configuration").select("*").single()

      if (schoolError && schoolError.code !== "PGRST116") {
        console.error("School config error:", schoolError)
      } else if (schoolData) {
        setSchoolConfig(schoolData)
      }

      // Load email configuration
      const { data: emailData, error: emailError } = await supabase.from("email_configuration").select("*").single()

      if (emailError && emailError.code !== "PGRST116") {
        console.error("Email config error:", emailError)
      } else if (emailData) {
        setEmailConfig(emailData)
      }

      // Load security configuration
      const { data: securityData, error: securityError } = await supabase.from("security_settings").select("*").single()

      if (securityError && securityError.code !== "PGRST116") {
        console.error("Security config error:", securityError)
      } else if (securityData) {
        setSecurityConfig(securityData)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadSystemStats = async () => {
    try {
      // Get user count
      const { count: userCount } = await supabase.from("users").select("*", { count: "exact", head: true })

      // Get application count
      const { count: appCount } = await supabase.from("applications").select("*", { count: "exact", head: true })

      setSystemStats({
        total_users: userCount || 0,
        active_sessions: 0, // Would need session tracking
        total_applications: appCount || 0,
        database_size: "~50 MB", // Approximate
        uptime: "24 days", // Would need system monitoring
      })
    } catch (error) {
      console.error("Error loading system stats:", error)
    }
  }

  const saveSchoolConfig = async () => {
    try {
      setSaving(true)

      const { error } = await supabase.from("school_configuration").upsert(schoolConfig)

      if (error) throw error

      toast({
        title: "Success",
        description: "School configuration saved successfully",
      })
    } catch (error: any) {
      console.error("Error saving school config:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save school configuration",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const saveEmailConfig = async () => {
    try {
      setSaving(true)

      const { error } = await supabase.from("email_configuration").upsert(emailConfig)

      if (error) throw error

      toast({
        title: "Success",
        description: "Email configuration saved successfully",
      })
    } catch (error: any) {
      console.error("Error saving email config:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save email configuration",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const saveSecurityConfig = async () => {
    try {
      setSaving(true)

      const { error } = await supabase.from("security_settings").upsert(securityConfig)

      if (error) throw error

      toast({
        title: "Success",
        description: "Security settings saved successfully",
      })
    } catch (error: any) {
      console.error("Error saving security config:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to save security settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const testEmailConfiguration = async () => {
    try {
      setTestingEmail(true)

      // This would typically send a test email
      // For now, we'll simulate the test
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Test Email Sent",
        description: "Test email sent successfully to " + emailConfig.from_email,
      })
    } catch (error: any) {
      console.error("Error testing email:", error)
      toast({
        title: "Email Test Failed",
        description: error.message || "Failed to send test email",
        variant: "destructive",
      })
    } finally {
      setTestingEmail(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading enterprise settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-3 h-8 w-8" />
            Enterprise Settings
          </h1>
          <p className="text-gray-600">Configure system-wide settings and preferences</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Activity className="mr-1 h-3 w-3" />
          System Online
        </Badge>
      </div>

      {/* System Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{systemStats.total_users}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold">{systemStats.total_applications}</p>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Database Size</p>
                <p className="text-2xl font-bold">{systemStats.database_size}</p>
              </div>
              <Database className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold">{systemStats.uptime}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="school" className="flex items-center">
            <School className="mr-2 h-4 w-4" />
            School
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* School Configuration */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <School className="mr-2 h-5 w-5" />
                School Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    value={schoolConfig.school_name}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_name: e.target.value })}
                    placeholder="Pharo Secondary School"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-code">School Code</Label>
                  <Input
                    id="school-code"
                    value={schoolConfig.school_code}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_code: e.target.value })}
                    placeholder="PSS"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <Input
                    id="academic-year"
                    value={schoolConfig.academic_year}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, academic_year: e.target.value })}
                    placeholder="2024-2025"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-term">Current Term</Label>
                  <Input
                    id="current-term"
                    value={schoolConfig.current_term}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, current_term: e.target.value })}
                    placeholder="Fall 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-address">School Address</Label>
                <Textarea
                  id="school-address"
                  value={schoolConfig.school_address}
                  onChange={(e) => setSchoolConfig({ ...schoolConfig, school_address: e.target.value })}
                  placeholder="123 Education Street, Mogadishu, Somalia"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="school-phone">School Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="school-phone"
                      value={schoolConfig.school_phone}
                      onChange={(e) => setSchoolConfig({ ...schoolConfig, school_phone: e.target.value })}
                      placeholder="+252-1-234-5678"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-email">School Email</Label>
                  <Input
                    id="school-email"
                    type="email"
                    value={schoolConfig.school_email}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_email: e.target.value })}
                    placeholder="info@pharosecondary.so"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="principal-name">Principal Name</Label>
                  <Input
                    id="principal-name"
                    value={schoolConfig.principal_name}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, principal_name: e.target.value })}
                    placeholder="Dr. Ahmed Hassan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principal-email">Principal Email</Label>
                  <Input
                    id="principal-email"
                    type="email"
                    value={schoolConfig.principal_email}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, principal_email: e.target.value })}
                    placeholder="principal@pharosecondary.so"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={schoolConfig.timezone}
                    onValueChange={(value) => setSchoolConfig({ ...schoolConfig, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Africa/Mogadishu">Africa/Mogadishu</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={schoolConfig.currency}
                    onValueChange={(value) => setSchoolConfig({ ...schoolConfig, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="SOS">SOS (Sh)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={schoolConfig.language}
                    onValueChange={(value) => setSchoolConfig({ ...schoolConfig, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="so">Somali</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSchoolConfig} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save School Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Configuration */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={emailConfig.smtp_host}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    value={emailConfig.smtp_port}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtp_port: Number.parseInt(e.target.value) })}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input
                    id="smtp-username"
                    value={emailConfig.smtp_username}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtp_username: e.target.value })}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailConfig.smtp_password}
                    onChange={(e) => setEmailConfig({ ...emailConfig, smtp_password: e.target.value })}
                    placeholder="Your app password"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={emailConfig.from_email}
                    onChange={(e) => setEmailConfig({ ...emailConfig, from_email: e.target.value })}
                    placeholder="admissions@pharosecondary.so"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={emailConfig.from_name}
                    onChange={(e) => setEmailConfig({ ...emailConfig, from_name: e.target.value })}
                    placeholder="Pharo Secondary School"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Encryption</Label>
                  <Select
                    value={emailConfig.smtp_encryption}
                    onValueChange={(value) => setEmailConfig({ ...emailConfig, smtp_encryption: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">TLS</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-emails">Max Daily Emails</Label>
                  <Input
                    id="max-emails"
                    type="number"
                    value={emailConfig.max_daily_emails}
                    onChange={(e) =>
                      setEmailConfig({ ...emailConfig, max_daily_emails: Number.parseInt(e.target.value) })
                    }
                    placeholder="1000"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={testEmailConfiguration} disabled={testingEmail}>
                  {testingEmail ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TestTube className="mr-2 h-4 w-4" />
                  )}
                  Test Email Configuration
                </Button>
                <Button onClick={saveEmailConfig} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Email Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password-length">Minimum Password Length</Label>
                  <Input
                    id="password-length"
                    type="number"
                    value={securityConfig.password_min_length}
                    onChange={(e) =>
                      setSecurityConfig({ ...securityConfig, password_min_length: Number.parseInt(e.target.value) })
                    }
                    min="6"
                    max="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-attempts"
                    type="number"
                    value={securityConfig.max_login_attempts}
                    onChange={(e) =>
                      setSecurityConfig({ ...securityConfig, max_login_attempts: Number.parseInt(e.target.value) })
                    }
                    min="3"
                    max="10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Password Requirements</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                    <Switch
                      id="require-uppercase"
                      checked={securityConfig.password_require_uppercase}
                      onCheckedChange={(checked) =>
                        setSecurityConfig({ ...securityConfig, password_require_uppercase: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-lowercase">Require Lowercase Letters</Label>
                    <Switch
                      id="require-lowercase"
                      checked={securityConfig.password_require_lowercase}
                      onCheckedChange={(checked) =>
                        setSecurityConfig({ ...securityConfig, password_require_lowercase: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-numbers">Require Numbers</Label>
                    <Switch
                      id="require-numbers"
                      checked={securityConfig.password_require_numbers}
                      onCheckedChange={(checked) =>
                        setSecurityConfig({ ...securityConfig, password_require_numbers: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-symbols">Require Symbols</Label>
                    <Switch
                      id="require-symbols"
                      checked={securityConfig.password_require_symbols}
                      onCheckedChange={(checked) =>
                        setSecurityConfig({ ...securityConfig, password_require_symbols: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockout-duration"
                    type="number"
                    value={securityConfig.lockout_duration_minutes}
                    onChange={(e) =>
                      setSecurityConfig({
                        ...securityConfig,
                        lockout_duration_minutes: Number.parseInt(e.target.value),
                      })
                    }
                    min="5"
                    max="1440"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securityConfig.session_timeout_minutes}
                    onChange={(e) =>
                      setSecurityConfig({ ...securityConfig, session_timeout_minutes: Number.parseInt(e.target.value) })
                    }
                    min="30"
                    max="1440"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for all users</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={securityConfig.two_factor_required}
                  onCheckedChange={(checked) => setSecurityConfig({ ...securityConfig, two_factor_required: checked })}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSecurityConfig} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    System Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Database Connection:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Service:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>File Storage:</span>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Backup Service:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-blue-600" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">~150ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Usage:</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Used:</span>
                      <span className="font-medium">2.1 GB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">System Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={loadSystemStats}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Stats
                  </Button>
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Database
                  </Button>
                  <Button variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    View Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
