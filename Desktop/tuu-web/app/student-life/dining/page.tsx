"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Utensils, Clock, Star, Leaf, Globe, Salad, DollarSign, Users, ArrowRight } from "lucide-react"
import EnhancedNavbar from "@/components/enhanced-navbar"
import EnhancedFooter from "@/components/enhanced-footer"

const diningLocations = [
  {
    id: 1,
    name: "Unity Central Dining Hall",
    campus: "Main Campus",
    type: "All-You-Can-Eat",
    cuisine: ["International", "American", "Vegetarian"],
    hours: "7:00 AM - 10:00 PM",
    priceRange: "$12-18/meal",
    features: ["Halal Options", "Vegan Corner", "Gluten-Free", "24/7 Coffee Bar"],
    description: "Our flagship dining hall featuring diverse cuisines from around the world",
    rating: 4.6,
    capacity: 800,
    featured: true,
  },
  {
    id: 2,
    name: "Global Flavors Food Court",
    campus: "Main Campus",
    type: "Food Court",
    cuisine: ["Asian", "Mediterranean", "Mexican", "Italian"],
    hours: "11:00 AM - 9:00 PM",
    priceRange: "$8-15/meal",
    features: ["Quick Service", "Grab & Go", "Mobile Ordering"],
    description: "Fast-casual dining with authentic international flavors",
    rating: 4.4,
    capacity: 300,
  },
  {
    id: 3,
    name: "Hargeisa Cultural Kitchen",
    campus: "Somalia Campus",
    type: "Cultural Dining",
    cuisine: ["Somali", "East African", "Middle Eastern"],
    hours: "6:00 AM - 9:00 PM",
    priceRange: "$5-12/meal",
    features: ["Traditional Recipes", "Halal Certified", "Local Ingredients"],
    description: "Authentic Somali and regional cuisine prepared with traditional methods",
    rating: 4.8,
    capacity: 200,
    featured: true,
  },
  {
    id: 4,
    name: "Dubai Fusion Café",
    campus: "UAE Campus",
    type: "Café & Restaurant",
    cuisine: ["Middle Eastern", "International", "Fusion"],
    hours: "7:00 AM - 11:00 PM",
    priceRange: "$10-25/meal",
    features: ["Premium Coffee", "Healthy Options", "Study-Friendly"],
    description: "Modern café blending Middle Eastern traditions with international flavors",
    rating: 4.7,
    capacity: 150,
    featured: true,
  },
  {
    id: 5,
    name: "Student Union Grill",
    campus: "Main Campus",
    type: "Casual Dining",
    cuisine: ["American", "Burgers", "Sandwiches"],
    hours: "11:00 AM - 8:00 PM",
    priceRange: "$6-12/meal",
    features: ["Late Night Menu", "Sports Viewing", "Group Seating"],
    description: "Casual spot for burgers, sandwiches, and comfort food",
    rating: 4.2,
    capacity: 120,
  },
  {
    id: 6,
    name: "Healthy Harvest",
    campus: "All Campuses",
    type: "Health-Focused",
    cuisine: ["Salads", "Smoothies", "Organic"],
    hours: "8:00 AM - 6:00 PM",
    priceRange: "$7-14/meal",
    features: ["Organic", "Locally Sourced", "Nutritional Info"],
    description: "Fresh, healthy options with locally sourced ingredients",
    rating: 4.5,
    capacity: 80,
  },
]

const mealPlans = [
  {
    name: "Unlimited Plus",
    price: "$2,800/semester",
    meals: "Unlimited dining hall access",
    flex: "$300 flex dollars",
    features: ["All dining halls", "Guest passes", "Late night access"],
    recommended: "First-year students",
    popular: true,
  },
  {
    name: "14 Meals/Week",
    price: "$2,400/semester",
    meals: "14 meals per week",
    flex: "$200 flex dollars",
    features: ["Dining halls", "Flexible timing", "Rollover meals"],
    recommended: "Most students",
  },
  {
    name: "10 Meals/Week",
    price: "$2,000/semester",
    meals: "10 meals per week",
    flex: "$150 flex dollars",
    features: ["Dining halls", "Weekend flexibility"],
    recommended: "Light eaters",
  },
  {
    name: "Flex Only",
    price: "$1,500/semester",
    meals: "No set meals",
    flex: "$1,500 flex dollars",
    features: ["All locations", "Maximum flexibility", "No expiration"],
    recommended: "Commuter students",
  },
]

const specialDiets = [
  {
    name: "Halal Options",
    icon: Globe,
    description: "Certified halal meals available at all major dining locations",
    locations: "All dining halls",
  },
  {
    name: "Vegetarian & Vegan",
    icon: Leaf,
    description: "Dedicated vegetarian and vegan stations with fresh options daily",
    locations: "Unity Central, Global Flavors",
  },
  {
    name: "Gluten-Free",
    icon: Salad,
    description: "Separate preparation areas and clearly marked gluten-free options",
    locations: "Unity Central, Healthy Harvest",
  },
  {
    name: "Allergen-Friendly",
    icon: Star,
    description: "Detailed allergen information and safe preparation protocols",
    locations: "All locations",
  },
]

export default function DiningPage() {
  const [selectedCampus, setSelectedCampus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const campuses = ["All", "Main Campus", "Somalia Campus", "UAE Campus"]
  const types = ["All", "All-You-Can-Eat", "Food Court", "Café & Restaurant", "Casual Dining", "Health-Focused"]

  const filteredDining = diningLocations.filter((location) => {
    const matchesCampus =
      selectedCampus === "All" || location.campus === selectedCampus || location.campus === "All Campuses"
    const matchesType = selectedType === "All" || location.type === selectedType
    return matchesCampus && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Campus Dining
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience diverse culinary traditions from around the world. Our dining services offer fresh, healthy,
              and culturally authentic meals across all Unity University campuses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Meal Plans
              </Button>
              <Button size="lg" variant="outline">
                Today's Menu
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Diets */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Dietary Accommodations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We cater to diverse dietary needs and cultural preferences, ensuring every student can enjoy delicious and
              appropriate meals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialDiets.map((diet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <diet.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{diet.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{diet.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {diet.locations}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 flex items-center">Campus:</span>
              {campuses.map((campus) => (
                <Button
                  key={campus}
                  variant={selectedCampus === campus ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCampus(campus)}
                >
                  {campus}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 flex items-center">Type:</span>
              {types.slice(0, 4).map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dining */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Dining Locations</h2>
            <p className="text-lg text-gray-600">Discover our most popular dining destinations across all campuses</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {diningLocations
              .filter((location) => location.featured)
              .map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                    <div className="aspect-video bg-gradient-to-r from-orange-500 to-red-500 relative">
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white text-gray-900">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{location.rating}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{location.name}</h3>
                        <div className="text-sm opacity-90">{location.campus}</div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{location.type}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          {location.capacity} seats
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {location.hours}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {location.priceRange}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{location.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Cuisine Types:</h4>
                        <div className="flex flex-wrap gap-2">
                          {location.cuisine.map((type, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Features:</h4>
                        <div className="grid grid-cols-2 gap-1 text-sm">
                          {location.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-green-500" />
                              <span className="text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        View Menu
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* All Dining Locations */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Dining Locations</h2>
            <p className="text-lg text-gray-600">Explore all dining options across Unity University campuses</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDining.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{location.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{location.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{location.name}</CardTitle>
                    <div className="text-sm text-gray-600">{location.campus}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {location.hours}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        {location.priceRange}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">{location.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {location.cuisine.map((type, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button size="sm" variant="outline">
                        View Hours
                      </Button>
                      <Button size="sm">Menu</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meal Plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the meal plan that fits your lifestyle and dining preferences. All plans include access to our
              diverse dining locations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`h-full transition-all duration-300 border-0 bg-white ${
                    plan.popular ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-lg"
                  }`}
                >
                  <CardHeader>
                    {plan.popular && <Badge className="w-fit bg-blue-500 text-white mb-2">Most Popular</Badge>}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{plan.price}</div>
                    <CardDescription>Recommended for {plan.recommended}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{plan.meals}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{plan.flex}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <Star className="w-3 h-3 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Our Dining Options?</h2>
            <p className="text-xl mb-8 opacity-90">
              Visit our dining locations, try our diverse cuisines, and find your new favorite meal!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary">
                Purchase Meal Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-orange-600"
              >
                Contact Dining Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Site Footer */}
      <EnhancedFooter />
    </div>
  )
}
