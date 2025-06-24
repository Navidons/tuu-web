import type { Metadata } from "next"
import SignUpForm from "@/components/auth/signup-form"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign Up - Samba Tours & Travel",
  description: "Create your account to start booking amazing tours",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-forest-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ST</span>
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold text-earth-900">Samba Tours</h1>
              <p className="text-sm text-earth-600">& Travel</p>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-earth-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-earth-600">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-forest-600 hover:text-forest-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}
