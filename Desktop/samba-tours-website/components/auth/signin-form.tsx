"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome, Facebook, Apple } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to account page
    router.push("/account")
    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Signing in with ${provider}`)
    // Implement social login
  }

  return (
    <div className="space-y-6">
      {/* Social Login */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("google")}>
          <Chrome className="h-4 w-4 mr-2" />
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("facebook")}>
          <Facebook className="h-4 w-4 mr-2" />
          Continue with Facebook
        </Button>
        <Button variant="outline" className="w-full" onClick={() => handleSocialLogin("apple")}>
          <Apple className="h-4 w-4 mr-2" />
          Continue with Apple
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-earth-500">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              required
              className="pl-10"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="pl-10 pr-10"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
          <Link href="/forgot-password" className="text-sm font-medium text-forest-600 hover:text-forest-500">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <p className="text-sm text-earth-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-forest-600 hover:text-forest-500">
            Sign up for free
          </Link>
        </p>
        <p className="text-xs text-earth-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-earth-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-earth-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
