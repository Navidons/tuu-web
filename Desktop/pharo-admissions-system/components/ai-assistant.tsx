"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Send, Bot, User, Sparkles, Brain, Zap } from "lucide-react"
import { format } from "date-fns"

interface Message {
  id: string
  type: "user" | "bot" | "system"
  content: string
  timestamp: Date
  intent?: string
  confidence?: number
  suggestions?: string[]
}

interface AIAssistantProps {
  applicationId?: string
  context?: "dashboard" | "application" | "general"
}

export function AIAssistant({ applicationId, context = "general" }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm your AI assistant. I can help you with application reviews, data analysis, and system insights. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze pending applications",
        "Show application trends",
        "Help with decision making",
        "System status check",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const botResponse = await generateAIResponse(input, context, applicationId)

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "system",
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (userInput: string, context: string, appId?: string): Promise<Message> => {
    const lowerInput = userInput.toLowerCase()

    // Simulate intelligent responses based on input
    let content = ""
    let suggestions: string[] = []
    let intent = ""
    const confidence = 0.85

    if (lowerInput.includes("pending") || lowerInput.includes("review")) {
      intent = "application_review"
      content =
        "I found 12 applications pending review. Based on my analysis:\n\n• 8 applications have high approval probability (>85%)\n• 3 require additional documentation\n• 1 needs manual review due to incomplete information\n\nWould you like me to prioritize them by urgency or approval likelihood?"
      suggestions = ["Show high-priority applications", "Generate approval recommendations", "Check missing documents"]
    } else if (lowerInput.includes("trend") || lowerInput.includes("analytic")) {
      intent = "data_analysis"
      content =
        "Here are the key trends I've identified:\n\n📈 Application volume increased 23% this month\n🎯 Approval rate: 78% (above target of 75%)\n⏱️ Average processing time: 2.3 days\n🔍 Top application sources: Online form (65%), Walk-ins (35%)\n\nThe system is performing well with strong conversion metrics."
      suggestions = ["Detailed monthly report", "Compare with last year", "Forecast next month"]
    } else if (lowerInput.includes("decision") || lowerInput.includes("recommend")) {
      intent = "decision_support"
      content =
        "I can help with decision-making using AI-powered insights:\n\n🧠 **Smart Scoring**: Automated application scoring based on 15+ factors\n📊 **Risk Assessment**: Identify potential issues before they occur\n🎯 **Recommendation Engine**: Data-driven approval/rejection suggestions\n\nWould you like me to analyze a specific application or provide general recommendations?"
      suggestions = ["Analyze specific application", "Bulk recommendation review", "Risk factor analysis"]
    } else if (lowerInput.includes("status") || lowerInput.includes("system")) {
      intent = "system_status"
      content =
        "System Status Report:\n\n✅ **Database**: Healthy (99.9% uptime)\n✅ **API**: Optimal performance\n✅ **Security**: All systems secure\n⚡ **Processing**: 156ms average response time\n📊 **Storage**: 78% capacity\n\nAll systems are operating normally. No issues detected."
      suggestions = ["View detailed metrics", "Performance optimization", "Security audit"]
    } else {
      intent = "general_assistance"
      content =
        "I understand you're looking for assistance. I can help with:\n\n• **Application Management**: Review, analyze, and process applications\n• **Data Insights**: Generate reports and identify trends\n• **Decision Support**: AI-powered recommendations\n• **System Monitoring**: Check performance and health\n\nWhat specific task would you like help with?"
      suggestions = ["Application review help", "Generate insights", "System assistance", "Process automation"]
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      intent,
      confidence,
      suggestions,
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "bot":
        return <Bot className="h-4 w-4 text-blue-600" />
      case "user":
        return <User className="h-4 w-4 text-gray-600" />
      default:
        return <Sparkles className="h-4 w-4 text-purple-600" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Brain className="h-6 w-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[32rem] shadow-2xl border-2 border-blue-200">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Brain className="mr-2 h-5 w-5" />
              AI Assistant
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(32rem-5rem)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={message.type === "user" ? "bg-gray-100" : "bg-blue-100"}>
                        {getMessageIcon(message.type)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : message.type === "system"
                            ? "bg-yellow-50 border border-yellow-200"
                            : "bg-gray-100"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      {message.confidence && (
                        <div className="mt-2 text-xs opacity-70">
                          Confidence: {(message.confidence * 100).toFixed(0)}%
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-1">{format(message.timestamp, "HH:mm")}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages[messages.length - 1]?.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
