"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { MapPin, Heart, Users, Calendar, DollarSign, Camera, Mountain } from "lucide-react"

const travelInterests = [
  { id: "wildlife", label: "Wildlife & Safari", icon: Camera },
  { id: "culture", label: "Cultural Experiences", icon: Users },
  { id: "adventure", label: "Adventure Sports", icon: Mountain },
  { id: "photography", label: "Photography Tours", icon: Camera },
  { id: "family", label: "Family-Friendly", icon: Users },
  { id: "luxury", label: "Luxury Travel", icon: Heart },
]

const accommodationTypes = [
  { id: "hotel", label: "Hotels" },
  { id: "lodge", label: "Safari Lodges" },
  { id: "camp", label: "Camping" },
  { id: "resort", label: "Resorts" },
  { id: "guesthouse", label: "Guesthouses" },
  { id: "apartment", label: "Apartments" },
]

export default function PreferencesContent() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["wildlife", "culture"])
  const [selectedAccommodation, setSelectedAccommodation] = useState<string[]>(["hotel", "lodge"])
  const [budgetRange, setBudgetRange] = useState([500, 2000])
  const [groupSize, setGroupSize] = useState([2, 8])

  const handleInterestChange = (interestId: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interestId])
    } else {
      setSelectedInterests(selectedInterests.filter((id) => id !== interestId))
    }
  }

  const handleAccommodationChange = (accommodationId: string, checked: boolean) => {
    if (checked) {
      setSelectedAccommodation([...selectedAccommodation, accommodationId])
    } else {
      setSelectedAccommodation(selectedAccommodation.filter((id) => id !== accommodationId))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-earth-900">Travel Preferences</h1>
        <p className="text-earth-600 mt-1">Customize your travel preferences to get personalized recommendations</p>
      </div>

      {/* Travel Interests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Travel Interests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelInterests.map((interest) => {
              const Icon = interest.icon
              return (
                <div key={interest.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={interest.id}
                    checked={selectedInterests.includes(interest.id)}
                    onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                  />
                  <Label htmlFor={interest.id} className="flex items-center space-x-2 cursor-pointer">
                    <Icon className="h-4 w-4" />
                    <span>{interest.label}</span>
                  </Label>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Budget Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Preferred budget range per person (USD)</Label>
              <div className="mt-4">
                <Slider
                  value={budgetRange}
                  onValueChange={setBudgetRange}
                  max={5000}
                  min={100}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-earth-600 mt-2">
                  <span>${budgetRange[0]}</span>
                  <span>${budgetRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Group Size Preference</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Preferred group size</Label>
              <div className="mt-4">
                <Slider value={groupSize} onValueChange={setGroupSize} max={20} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-sm text-earth-600 mt-2">
                  <span>
                    {groupSize[0]} person{groupSize[0] > 1 ? "s" : ""}
                  </span>
                  <span>{groupSize[1]} people</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accommodation Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Accommodation Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accommodationTypes.map((accommodation) => (
              <div key={accommodation.id} className="flex items-center space-x-3">
                <Checkbox
                  id={accommodation.id}
                  checked={selectedAccommodation.includes(accommodation.id)}
                  onCheckedChange={(checked) => handleAccommodationChange(accommodation.id, checked as boolean)}
                />
                <Label htmlFor={accommodation.id} className="cursor-pointer">
                  {accommodation.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Travel Timing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Travel Timing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="preferredSeason">Preferred Season</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry">Dry Season (Jun-Sep)</SelectItem>
                  <SelectItem value="wet">Wet Season (Oct-May)</SelectItem>
                  <SelectItem value="any">Any Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tripDuration">Preferred Trip Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 days</SelectItem>
                  <SelectItem value="4-7">4-7 days</SelectItem>
                  <SelectItem value="8-14">8-14 days</SelectItem>
                  <SelectItem value="15+">15+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Preferences</Button>
      </div>
    </div>
  )
}
