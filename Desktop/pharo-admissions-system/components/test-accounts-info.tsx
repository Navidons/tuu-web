import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Key } from "lucide-react"

export function TestAccountsInfo() {
  const testAccounts = [
    {
      role: "Admin",
      email: "admin@pharosecondary.so",
      password: "admin123",
      permissions: "Full system access - manage all applications, users, and settings",
      color: "bg-red-100 text-red-800",
    },
    {
      role: "Clerk",
      email: "clerk@pharosecondary.so",
      password: "clerk123",
      permissions: "Can add and update applications but cannot approve/reject",
      color: "bg-blue-100 text-blue-800",
    },
    {
      role: "Principal",
      email: "principal@pharosecondary.so",
      password: "principal123",
      permissions: "Final approval authority for admissions decisions",
      color: "bg-purple-100 text-purple-800",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Test Accounts</h2>
        <p className="text-gray-600">Use these accounts to test different role permissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {testAccounts.map((account) => (
          <Card key={account.role} className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  {account.role}
                </div>
                <Badge className={account.color}>{account.role}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">{account.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  <Key className="mr-1 h-4 w-4" />
                  Password
                </p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">{account.password}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Permissions</p>
                <p className="text-sm text-gray-700">{account.permissions}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Important Notes:</p>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• These are test accounts for development and demonstration purposes</li>
                <li>• Change passwords before deploying to production</li>
                <li>• Admin account has full system access - use carefully</li>
                <li>• Each role has different permissions as defined in the system specification</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
