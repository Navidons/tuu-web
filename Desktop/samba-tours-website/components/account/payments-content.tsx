"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Trash2, Shield, Calendar, DollarSign, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const paymentMethods = [
  {
    id: "pm_1",
    type: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    isDefault: true,
    name: "John Doe",
  },
  {
    id: "pm_2",
    type: "mastercard",
    last4: "5555",
    expiryMonth: "08",
    expiryYear: "2026",
    isDefault: false,
    name: "John Doe",
  },
]

const transactions = [
  {
    id: "txn_1",
    date: "2024-01-15",
    description: "Gorilla Trekking Adventure",
    amount: 1200,
    status: "completed",
    method: "•••• 4242",
  },
  {
    id: "txn_2",
    date: "2024-01-10",
    description: "Murchison Falls Safari",
    amount: 850,
    status: "completed",
    method: "•••• 5555",
  },
  {
    id: "txn_3",
    date: "2024-01-05",
    description: "Queen Elizabeth Wildlife Tour",
    amount: 950,
    status: "pending",
    method: "•••• 4242",
  },
]

export default function PaymentsContent() {
  const [isAddingCard, setIsAddingCard] = useState(false)

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      default:
        return "💳"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earth-900">Payment Methods</h1>
        <p className="text-earth-600 mt-1">Manage your payment methods and view transaction history</p>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Saved Payment Methods</span>
            </CardTitle>
            <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Payment Method</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryMonth">Month</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                              {String(i + 1).padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expiryYear">Year</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={2024 + i} value={String(2024 + i)}>
                              {2024 + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={4} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-earth-600">Your payment information is encrypted and secure</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsAddingCard(false)} className="flex-1">
                      Add Payment Method
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getCardIcon(method.type)}</div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">•••• •••• •••• {method.last4}</span>
                      {method.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                    <p className="text-sm text-earth-600">
                      Expires {method.expiryMonth}/{method.expiryYear} • {method.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Transaction History</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-forest-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-earth-900">{transaction.description}</h4>
                    <p className="text-sm text-earth-600">
                      {transaction.date} • {transaction.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-earth-900">${transaction.amount}</p>
                  <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
