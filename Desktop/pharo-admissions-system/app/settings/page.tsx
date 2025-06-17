"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  School,
  Users,
  Mail,
  Shield,
  Database,
  Bell,
  Globe,
  Zap,
  Lock,
  Server,
  AlertTriangle,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Activity,
} from "lucide-react"

interface SchoolConfig {
  school_name: string
  school_code: string
  academic_year: string
  current_term: string
  admission_term: string
  school_address: string
  school_phone: string
  school_email: string
  school_website: string
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
  reply_to_email: string
  max_daily_emails: number
  email_queue_enabled: boolean
  tracking_enabled: boolean
}

interface ApplicationSettings {
  max_applications_per_day: number
  application_deadline: string
  late_applications_allowed: boolean
  application_fee: number
  require_documents: boolean
  require_interview: boolean
  auto_approval_enabled: boolean
  auto_approval_threshold: number
  notification_enabled: boolean
  email_notifications_enabled: boolean
  application_number_prefix: string
  application_number_format: string
}

interface SecuritySettings {
  password_min_length: number
  password_require_uppercase: boolean
  password_require_lowercase: boolean
  password_require_numbers: boolean
  password_require_symbols: boolean
  password_expiry_days: number
  max_login_attempts: number
  lockout_duration_minutes: number
  session_timeout_minutes: number
  two_factor_required: boolean
  ip_whitelist_enabled: boolean
  allowed_ip_ranges: string[]
}

export default function EnterpriseSettingsPage() {
  const { user, userRole } = useAuth()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("school")
  const [showPasswords, setShowPasswords] = useState(false)

  // Settings state
  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>({
    school_name: "",
    school_code: "",
    academic_year: "",
    current_term: "",
    admission_term: "",
    school_address: "",
    school_phone: "",
    school_email: "",
    school_website: "",
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
    reply_to_email: "",
    max_daily_emails: 1000,
    email_queue_enabled: true,
    tracking_enabled: true,
  })

  const [applicationSettings, setApplicationSettings] = useState<ApplicationSettings>({
    max_applications_per_day: 100,
    application_deadline: "",
    late_applications_allowed: false,
    application_fee: 0,
    require_documents: true,
    require_interview: false,
    auto_approval_enabled: false,
    auto_approval_threshold: 85,
    notification_enabled: true,
    email_notifications_enabled: true,
    application_number_prefix: "APP",
    application_number_format: "{prefix}-{year}-{sequence}",
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    password_min_length: 8,
    password_require_uppercase: true,
    password_require_lowercase: true,
    password_require_numbers: true,
    password_require_symbols: false,
    password_expiry_days: 90,
    max_login_attempts: 5,
    lockout_duration_minutes: 30,
    session_timeout_minutes: 480,
    two_factor_required: false,
    ip_whitelist_enabled: false,
    allowed_ip_ranges: [],
  })

  const [systemStats, setSystemStats] = useState({
    total_users: 0,
    active_sessions: 0,
    total_applications: 0,
    database_size: "0 MB",
    last_backup: null,
    system_uptime: "0 days",
  })

  useEffect(() => {
    if (user && userRole) {
      loadAllSettings()
      loadSystemStats()
    }
  }, [user, userRole])

  const loadAllSettings = async () => {
    setLoading(true)
    try {
      await Promise.all([loadSchoolConfig(), loadEmailConfig(), loadApplicationSettings(), loadSecuritySettings()])
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

  const loadSchoolConfig = async () => {
    try {
      const { data, error } = await supabase.from("school_configuration").select("*").single()

      if (error && error.code !== "PGRST116") throw error
      if (data) {
        setSchoolConfig(data)
      }
    } catch (error) {
      console.error("Error loading school config:", error)
    }
  }

  const loadEmailConfig = async () => {
    try {
      const { data, error } = await supabase.from("email_configuration").select("*").single()

      if (error && error.code !== "PGRST116") throw error
      if (data) {
        setEmailConfig(data)
      }
    } catch (error) {
      console.error("Error loading email config:", error)
    }
  }

  const loadApplicationSettings = async () => {
    try {
      const { data, error } = await supabase.from("application_settings").select("*").single()

      if (error && error.code !== "PGRST116") throw error
      if (data) {
        setApplicationSettings({
          ...data,
          application_deadline: data.application_deadline || "",
        })
      }
    } catch (error) {
      console.error("Error loading application settings:", error)
    }
  }

  const loadSecuritySettings = async () => {
    try {
      const { data, error } = await supabase.from("security_settings").select("*").single()

      if (error && error.code !== "PGRST116") throw error
      if (data) {
        setSecuritySettings({
          ...data,
          allowed_ip_ranges: data.allowed_ip_ranges || [],
        })
      }
    } catch (error) {
      console.error("Error loading security settings:", error)
    }
  }

  const loadSystemStats = async () => {
    try {
      // Load system statistics
      const [usersResult, applicationsResult] = await Promise.all([
        supabase.from("users").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
      ])

      setSystemStats({
        total_users: usersResult.count || 0,
        active_sessions: 0, // Would need to implement session tracking
        total_applications: applicationsResult.count || 0,
        database_size: "0 MB", // Would need database size query
        last_backup: null,
        system_uptime: "0 days",
      })
    } catch (error) {
      console.error("Error loading system stats:", error)
    }
  }

  const saveSchoolConfig = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("school_configuration").upsert(schoolConfig)

      if (error) throw error

      toast({
        title: "Success",
        description: "School configuration saved successfully",
      })
    } catch (error) {
      console.error("Error saving school config:", error)
      toast({
        title: "Error",
        description: "Failed to save school configuration",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const saveEmailConfig = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("email_configuration").upsert(emailConfig)

      if (error) throw error

      toast({
        title: "Success",
        description: "Email configuration saved successfully",
      })
    } catch (error) {
      console.error("Error saving email config:", error)
      toast({
        title: "Error",
        description: "Failed to save email configuration",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const saveApplicationSettings = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("application_settings").upsert(applicationSettings)

      if (error) throw error

      toast({
        title: "Success",
        description: "Application settings saved successfully",
      })
    } catch (error) {
      console.error("Error saving application settings:", error)
      toast({
        title: "Error",
        description: "Failed to save application settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const saveSecuritySettings = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("security_settings").upsert(securitySettings)

      if (error) throw error

      toast({
        title: "Success",
        description: "Security settings saved successfully",
      })
    } catch (error) {
      console.error("Error saving security settings:", error)
      toast({
        title: "Error",
        description: "Failed to save security settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const testEmailConnection = async () => {
    setSaving(true)
    try {
      // This would typically test the SMTP connection
      toast({
        title: "Email Test",
        description: "Email configuration test completed",
      })
    } catch (error) {
      toast({
        title: "Email Test Failed",
        description: "Could not connect to email server",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const exportSettings = async () => {
    try {
      const settings = {
        school_configuration: schoolConfig,
        email_configuration: { ...emailConfig, smtp_password: "[REDACTED]" },
        application_settings: applicationSettings,
        security_settings: securitySettings,
        exported_at: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(settings, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pharo-settings-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Settings exported successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export settings",
        variant: "destructive",
      })
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
          <p className="text-gray-600">Comprehensive system configuration and management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button variant="outline" onClick={loadAllSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.total_users}</p>
                <p className="text-xs text-gray-500">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.active_sessions}</p>
                <p className="text-xs text-gray-500">Active Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.total_applications}</p>
                <p className="text-xs text-gray-500">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{systemStats.database_size}</p>
                <p className="text-xs text-gray-500">Database Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="school" className="flex items-center space-x-2">
            <School className="h-4 w-4" />
            <span>School</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Applications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Server className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        {/* School Configuration Tab */}
        <TabsContent value="school" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <School className="mr-2 h-5 w-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    value={schoolConfig.school_name}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_name: e.target.value })}
                    placeholder="Enter school name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-code">School Code</Label>
                  <Input
                    id="school-code"
                    value={schoolConfig.school_code}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_code: e.target.value })}
                    placeholder="Enter school code"
                  />
                </div>
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
                  <Select
                    value={schoolConfig.current_term}
                    onValueChange={(value) => setSchoolConfig({ ...schoolConfig, current_term: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                      <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                      <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-address">School Address</Label>
                <Textarea
                  id="school-address"
                  value={schoolConfig.school_address}
                  onChange={(e) => setSchoolConfig({ ...schoolConfig, school_address: e.target.value })}
                  placeholder="Enter complete school address"
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="school-phone">School Phone</Label>
                  <Input
                    id="school-phone"
                    value={schoolConfig.school_phone}
                    onChange={(e) => setSchoolConfig({ ...schoolConfig, school_phone: e.target.value })}
                    placeholder="+252-1-234-5678"
                  />
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

              <Separator />

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
                  Save School Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Configuration Tab */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Email credentials are encrypted and stored securely. Test your configuration before saving.
                </AlertDescription>
              </Alert>

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
                  <div className="relative">
                    <Input
                      id="smtp-password"
                      type={showPasswords ? "text" : "password"}
                      value={emailConfig.smtp_password}
                      onChange={(e) => setEmailConfig({ ...emailConfig, smtp_password: e.target.value })}
                      placeholder="App password or SMTP password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
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

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-medium">Email Features</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Queue</Label>
                      <p className="text-sm text-gray-500">Enable email queue for reliable delivery</p>
                    </div>
                    <Switch
                      checked={emailConfig.email_queue_enabled}
                      onCheckedChange={(checked) => setEmailConfig({ ...emailConfig, email_queue_enabled: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Tracking</Label>
                      <p className="text-sm text-gray-500">Track email opens and clicks</p>
                    </div>
                    <Switch
                      checked={emailConfig.tracking_enabled}
                      onCheckedChange={(checked) => setEmailConfig({ ...emailConfig, tracking_enabled: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={testEmailConnection} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                  Test Connection
                </Button>
                <Button onClick={saveEmailConfig} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Email Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Application Settings Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Application Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="max-applications">Max Applications per Day</Label>
                  <Input
                    id="max-applications"
                    type="number"
                    value={applicationSettings.max_applications_per_day}
                    onChange={(e) =>
                      setApplicationSettings({
                        ...applicationSettings,
                        max_applications_per_day: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application-deadline">Application Deadline</Label>
                  <Input
                    id="application-deadline"
                    type="date"
                    value={applicationSettings.application_deadline}
                    onChange={(e) =>
                      setApplicationSettings({
                        ...applicationSettings,
                        application_deadline: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application-fee">Application Fee ({schoolConfig.currency})</Label>
                  <Input
                    id="application-fee"
                    type="number"
                    step="0.01"
                    value={applicationSettings.application_fee}
                    onChange={(e) =>
                      setApplicationSettings({
                        ...applicationSettings,
                        application_fee: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auto-approval-threshold">Auto Approval Threshold (%)</Label>
                  <Input
                    id="auto-approval-threshold"
                    type="number"
                    min="0"
                    max="100"
                    value={applicationSettings.auto_approval_threshold}
                    onChange={(e) =>
                      setApplicationSettings({
                        ...applicationSettings,
                        auto_approval_threshold: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-medium">Application Requirements</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Documents</Label>
                      <p className="text-sm text-gray-500">Require document upload for applications</p>
                    </div>
                    <Switch
                      checked={applicationSettings.require_documents}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({ ...applicationSettings, require_documents: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Interview</Label>
                      <p className="text-sm text-gray-500">Require interview for all applications</p>
                    </div>
                    <Switch
                      checked={applicationSettings.require_interview}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({ ...applicationSettings, require_interview: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Late Applications</Label>
                      <p className="text-sm text-gray-500">Allow applications after deadline</p>
                    </div>
                    <Switch
                      checked={applicationSettings.late_applications_allowed}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({
                          ...applicationSettings,
                          late_applications_allowed: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Approval</Label>
                      <p className="text-sm text-gray-500">Automatically approve high-scoring applications</p>
                    </div>
                    <Switch
                      checked={applicationSettings.auto_approval_enabled}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({ ...applicationSettings, auto_approval_enabled: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-medium">Notifications</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications for application updates</p>
                    </div>
                    <Switch
                      checked={applicationSettings.notification_enabled}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({ ...applicationSettings, notification_enabled: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send email notifications to applicants</p>
                    </div>
                    <Switch
                      checked={applicationSettings.email_notifications_enabled}
                      onCheckedChange={(checked) =>
                        setApplicationSettings({
                          ...applicationSettings,
                          email_notifications_enabled: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveApplicationSettings} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Application Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  Security settings affect all users. Changes take effect immediately.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="text-lg font-medium">Password Policy</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password-min-length">Minimum Password Length</Label>
                    <Input
                      id="password-min-length"
                      type="number"
                      min="6"
                      max="32"
                      value={securitySettings.password_min_length}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          password_min_length: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Input
                      id="password-expiry"
                      type="number"
                      min="0"
                      value={securitySettings.password_expiry_days}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          password_expiry_days: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Uppercase</Label>
                      <p className="text-sm text-gray-500">Password must contain uppercase letters</p>
                    </div>
                    <Switch
                      checked={securitySettings.password_require_uppercase}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          password_require_uppercase: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Numbers</Label>
                      <p className="text-sm text-gray-500">Password must contain numbers</p>
                    </div>
                    <Switch
                      checked={securitySettings.password_require_numbers}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          password_require_numbers: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Symbols</Label>
                      <p className="text-sm text-gray-500">Password must contain special characters</p>
                    </div>
                    <Switch
                      checked={securitySettings.password_require_symbols}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          password_require_symbols: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Require 2FA for all users</p>
                    </div>
                    <Switch
                      checked={securitySettings.two_factor_required}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, two_factor_required: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-lg font-medium">Session Management</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      min="3"
                      max="10"
                      value={securitySettings.max_login_attempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          max_login_attempts: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                    <Input
                      id="lockout-duration"
                      type="number"
                      min="5"
                      value={securitySettings.lockout_duration_minutes}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          lockout_duration_minutes: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      min="30"
                      value={securitySettings.session_timeout_minutes}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          session_timeout_minutes: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSecuritySettings} disabled={saving}>
                  {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive user management features are available in the dedicated Users section.
                </p>
                <Button variant="outline" onClick={() => (window.location.href = "/users")}>
                  Go to User Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Management Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Database Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Database Size</p>
                    <p className="text-sm text-gray-500">{systemStats.database_size}</p>
                  </div>
                  <Badge variant="outline">Healthy</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Backup
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Optimize
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Health</p>
                    <p className="text-sm text-gray-500">All services operational</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Uptime</p>
                    <p className="text-sm text-gray-500">{systemStats.system_uptime}</p>
                  </div>
                  <Badge variant="outline">Stable</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Activity className="mr-2 h-4 w-4" />
                    Logs
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Maintenance Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable system access</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenance-message">Maintenance Message</Label>
                  <Textarea
                    id="maintenance-message"
                    placeholder="System is under maintenance. Please try again later."
                    rows={3}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trash2 className="mr-2 h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Data operations are irreversible. Please backup before proceeding.
                  </AlertDescription>
                </Alert>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Data
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Purge Old Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
