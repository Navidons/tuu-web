import { Suspense } from "react"
import { notFound } from "next/navigation"
import BlogPostHeader from "@/components/blog/blog-post-header"
import BlogPostContent from "@/components/blog/blog-post-content"
import BlogPostSidebar from "@/components/blog/blog-post-sidebar"
import RelatedPosts from "@/components/blog/related-posts"
import BlogComments from "@/components/blog/blog-comments"
import LoadingSpinner from "@/components/ui/loading-spinner"

// Update the getBlogPost function to include all the blog posts referenced in the system

const getBlogPost = async (id: string) => {
  // Simulate API call with complete blog posts database
  const posts = {
    "1": {
      id: 1,
      title: "The Ultimate Guide to Gorilla Trekking in Uganda: Everything You Need to Know",
      content: `
        <p>Mountain gorilla trekking in Uganda is one of the world's most extraordinary wildlife experiences. This comprehensive guide will prepare you for an unforgettable encounter with these magnificent creatures in their natural habitat.</p>
        
        <h2>What Makes Uganda Special for Gorilla Trekking?</h2>
        <p>Uganda is home to nearly half of the world's remaining mountain gorillas, with populations thriving in Bwindi Impenetrable National Park and Mgahinga Gorilla National Park. The country's commitment to conservation has made it the premier destination for gorilla trekking experiences.</p>
        
        <h2>Best Time to Visit</h2>
        <p>While gorilla trekking is possible year-round, the dry seasons (June to August and December to February) offer the best trekking conditions. However, the wet seasons can provide unique advantages, including lush vegetation and fewer crowds.</p>
        
        <h2>What to Expect During Your Trek</h2>
        <p>Gorilla trekking involves hiking through dense forest terrain, which can be challenging but incredibly rewarding. Treks can last anywhere from 1-8 hours depending on the gorilla family's location. Once you find them, you'll have one magical hour to observe and photograph these gentle giants.</p>
        
        <h2>Essential Preparation Tips</h2>
        <ul>
          <li>Physical fitness is important - prepare with regular hiking and cardio exercises</li>
          <li>Pack appropriate gear including waterproof clothing and sturdy hiking boots</li>
          <li>Bring a good camera with extra batteries</li>
          <li>Follow all park guidelines and maintain a 7-meter distance from gorillas</li>
        </ul>
        
        <h2>Conservation Impact</h2>
        <p>Your visit directly contributes to gorilla conservation efforts and supports local communities. Tourism revenue funds anti-poaching activities, habitat protection, and community development projects.</p>
      `,
      excerpt:
        "Discover the secrets of successful gorilla trekking in Bwindi Impenetrable Forest. From preparation tips to what to expect during your encounter with mountain gorillas.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Gorilla Trekking",
      author: {
        name: "James Okello",
        role: "Senior Safari Guide",
        image: "/placeholder.svg?height=100&width=100",
        bio: "James has over 10 years of experience leading gorilla trekking expeditions and is passionate about wildlife conservation.",
      },
      date: "2024-03-20",
      readTime: "12 min read",
      views: 5600,
      likes: 234,
      tags: ["Gorilla Trekking", "Wildlife", "Conservation", "Uganda", "Bwindi"],
      featured: true,
    },
    "2": {
      id: 2,
      title: "Best Time to Visit Uganda: A Month-by-Month Guide",
      content: `
        <p>Planning the perfect time for your Uganda adventure? This comprehensive month-by-month guide will help you choose the ideal time based on weather, wildlife viewing, and seasonal highlights.</p>
        
        <h2>Dry Seasons: Peak Travel Times</h2>
        <p>Uganda has two main dry seasons that offer the best conditions for most activities:</p>
        
        <h3>December to February</h3>
        <p>This is one of Uganda's peak tourist seasons, offering excellent weather conditions and optimal wildlife viewing opportunities. Temperatures are warm but comfortable, and rainfall is minimal.</p>
        
        <h3>June to August</h3>
        <p>The second dry season coincides with the Northern Hemisphere's summer holidays. This period offers the best conditions for gorilla trekking and wildlife safaris.</p>
        
        <h2>Wet Seasons: Unique Advantages</h2>
        <p>Don't overlook the wet seasons - they offer their own unique advantages:</p>
        
        <h3>March to May</h3>
        <p>The long rains bring lush green landscapes and fewer crowds. It's an excellent time for birdwatching as migratory species arrive.</p>
        
        <h3>September to November</h3>
        <p>The short rains create beautiful scenery and offer more affordable rates. Wildlife is still easily spotted, and the weather is generally pleasant.</p>
        
        <h2>Activity-Specific Timing</h2>
        <ul>
          <li><strong>Gorilla Trekking:</strong> Year-round, but dry seasons offer easier hiking conditions</li>
          <li><strong>Wildlife Safaris:</strong> Dry seasons for easier game viewing</li>
          <li><strong>Birdwatching:</strong> November to April for migratory species</li>
          <li><strong>White Water Rafting:</strong> Year-round, with higher water levels during rains</li>
        </ul>
      `,
      excerpt:
        "Plan your perfect Uganda adventure with our comprehensive guide to weather, wildlife, and seasonal highlights.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Travel Planning",
      author: {
        name: "Sarah Namukasa",
        role: "Travel Specialist",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Sarah has been helping travelers plan perfect Uganda adventures for over 8 years, with expertise in seasonal travel planning.",
      },
      date: "2024-03-18",
      readTime: "8 min read",
      views: 2450,
      likes: 89,
      tags: ["Travel Planning", "Weather", "Seasons", "Uganda", "Best Time"],
      featured: false,
    },
    "3": {
      id: 3,
      title: "Photography Tips for Your Uganda Safari",
      content: `
        <p>Capture stunning wildlife photos during your Uganda safari with these expert tips from our professional guides and photographers.</p>
        
        <h2>Essential Camera Equipment</h2>
        <p>While you don't need the most expensive gear, having the right equipment makes a significant difference:</p>
        <ul>
          <li>DSLR or mirrorless camera with interchangeable lenses</li>
          <li>Telephoto lens (200-400mm minimum for wildlife)</li>
          <li>Extra batteries and memory cards</li>
          <li>Lens cleaning kit for dusty conditions</li>
        </ul>
        
        <h2>Camera Settings for Wildlife</h2>
        <p>Master these fundamental settings for better wildlife photography:</p>
        <ul>
          <li><strong>Shutter Priority Mode:</strong> Use fast shutter speeds (1/500s or faster) for moving animals</li>
          <li><strong>Continuous Autofocus:</strong> Track moving subjects effectively</li>
          <li><strong>Burst Mode:</strong> Capture multiple frames to get the perfect shot</li>
          <li><strong>ISO Settings:</strong> Don't be afraid to use higher ISOs in low light</li>
        </ul>
        
        <h2>Composition Techniques</h2>
        <p>Create compelling wildlife images with these composition tips:</p>
        <ul>
          <li>Fill the frame with your subject</li>
          <li>Focus on the eyes - they should always be sharp</li>
          <li>Use the rule of thirds for dynamic compositions</li>
          <li>Include environmental context when possible</li>
        </ul>
        
        <h2>Ethical Wildlife Photography</h2>
        <p>Always prioritize animal welfare and park regulations:</p>
        <ul>
          <li>Maintain required distances from wildlife</li>
          <li>Never use flash photography with animals</li>
          <li>Respect your guide's instructions</li>
          <li>Be patient - great shots come to those who wait</li>
        </ul>
      `,
      excerpt:
        "Capture stunning wildlife photos with expert tips from our professional safari guides and photographers.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Photography",
      author: {
        name: "Robert Tumusiime",
        role: "Adventure Sports Specialist",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Robert combines his love for adventure sports with professional photography, capturing Uganda's wildlife for over 6 years.",
      },
      date: "2024-03-15",
      readTime: "10 min read",
      views: 1890,
      likes: 67,
      tags: ["Photography", "Wildlife", "Safari", "Camera Tips", "Uganda"],
      featured: false,
    },
    "4": {
      id: 4,
      title: "Cultural Etiquette: Respectful Travel in Uganda",
      content: `
        <p>Learn about Ugandan customs, traditions, and how to be a respectful visitor to local communities during your travels.</p>
        
        <h2>Understanding Ugandan Culture</h2>
        <p>Uganda is home to over 50 different ethnic groups, each with unique traditions and customs. Understanding and respecting these differences enhances your travel experience and shows appreciation for local culture.</p>
        
        <h2>Greetings and Social Interactions</h2>
        <ul>
          <li>Always greet people before starting a conversation</li>
          <li>Handshakes are common, but wait for others to extend their hand first</li>
          <li>Use both hands when giving or receiving items</li>
          <li>Show respect to elders by greeting them first</li>
        </ul>
        
        <h2>Dress Code and Appearance</h2>
        <p>Dressing appropriately shows respect for local customs:</p>
        <ul>
          <li>Dress modestly, especially when visiting villages or religious sites</li>
          <li>Cover shoulders and knees in rural areas</li>
          <li>Remove hats when entering homes or meeting elders</li>
          <li>Avoid overly revealing clothing</li>
        </ul>
        
        <h2>Photography Etiquette</h2>
        <ul>
          <li>Always ask permission before photographing people</li>
          <li>Respect when someone declines to be photographed</li>
          <li>Be sensitive about photographing in villages</li>
          <li>Consider offering to share photos with subjects</li>
        </ul>
        
        <h2>Gift Giving and Tipping</h2>
        <p>Thoughtful gestures are appreciated but should be done respectfully:</p>
        <ul>
          <li>Small gifts for children should be given to parents or teachers</li>
          <li>Avoid giving money directly to children</li>
          <li>Tip guides and service providers appropriately</li>
          <li>Support local businesses and artisans</li>
        </ul>
      `,
      excerpt: "Learn about Ugandan customs, traditions, and how to be a respectful visitor to local communities.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Culture",
      author: {
        name: "Mary Atuhaire",
        role: "Cultural Experience Coordinator",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Mary specializes in cultural tourism and has been facilitating meaningful cultural exchanges for over 7 years.",
      },
      date: "2024-03-12",
      readTime: "6 min read",
      views: 1650,
      likes: 45,
      tags: ["Culture", "Etiquette", "Respect", "Local Communities", "Uganda"],
      featured: false,
    },
    "5": {
      id: 5,
      title: "10 Essential Items to Pack for Your Uganda Safari",
      content: `
        <p>Don't leave home without these crucial items. Our comprehensive packing checklist ensures you're prepared for any adventure in Uganda's diverse landscapes.</p>
        
        <h2>Clothing Essentials</h2>
        <ul>
          <li><strong>Lightweight, long-sleeved shirts:</strong> Protection from sun and insects</li>
          <li><strong>Convertible pants:</strong> Versatile for different weather conditions</li>
          <li><strong>Waterproof jacket:</strong> Essential for Uganda's unpredictable weather</li>
          <li><strong>Comfortable hiking boots:</strong> Sturdy footwear for gorilla trekking</li>
          <li><strong>Hat with brim:</strong> Sun protection during game drives</li>
        </ul>
        
        <h2>Health and Safety Items</h2>
        <ul>
          <li><strong>Insect repellent:</strong> DEET-based for effective protection</li>
          <li><strong>Sunscreen (SPF 30+):</strong> High altitude means stronger UV rays</li>
          <li><strong>First aid kit:</strong> Basic medications and bandages</li>
          <li><strong>Water purification tablets:</strong> Backup for safe drinking water</li>
          <li><strong>Personal medications:</strong> Bring extra supplies</li>
        </ul>
        
        <h2>Photography and Electronics</h2>
        <ul>
          <li><strong>Camera with extra batteries:</strong> Wildlife photography opportunities abound</li>
          <li><strong>Binoculars:</strong> Essential for wildlife viewing and bird watching</li>
          <li><strong>Portable charger/power bank:</strong> Keep devices charged in remote areas</li>
          <li><strong>Headlamp or flashlight:</strong> For early morning starts and evening activities</li>
          <li><strong>Waterproof bags:</strong> Protect electronics from rain and dust</li>
        </ul>
        
        <h2>Comfort and Convenience</h2>
        <ul>
          <li><strong>Quick-dry towel:</strong> Lightweight and practical</li>
          <li><strong>Comfortable daypack:</strong> For day trips and gorilla trekking</li>
          <li><strong>Reusable water bottle:</strong> Stay hydrated and reduce plastic waste</li>
          <li><strong>Snacks:</strong> Energy bars for long days in the field</li>
          <li><strong>Cash (USD):</strong> For tips, souvenirs, and local purchases</li>
        </ul>
        
        <h2>What NOT to Pack</h2>
        <ul>
          <li>Camouflage clothing (illegal in Uganda)</li>
          <li>Excessive jewelry or valuables</li>
          <li>Heavy cotton clothing</li>
          <li>Too many outfit changes</li>
        </ul>
      `,
      excerpt:
        "Don't leave home without these crucial items. Our comprehensive packing checklist ensures you're prepared for any adventure.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Travel Planning",
      author: {
        name: "David Mukasa",
        role: "Founder & CEO",
        image: "/placeholder.svg?height=100&width=100",
        bio: "David has led hundreds of safaris and knows exactly what travelers need for a successful Uganda adventure.",
      },
      date: "2024-03-10",
      readTime: "7 min read",
      views: 3200,
      likes: 89,
      tags: ["Packing", "Safari", "Preparation", "Travel Tips", "Uganda"],
      featured: false,
    },
    "6": {
      id: 6,
      title: "The Secret Life of Mountain Gorillas: Behavioral Insights",
      content: `
        <p>Discover fascinating insights into gorilla behavior, social structures, and conservation efforts in Uganda's forests. Understanding these magnificent creatures enhances your trekking experience.</p>
        
        <h2>Gorilla Social Structure</h2>
        <p>Mountain gorillas live in complex social groups led by a dominant silverback male:</p>
        <ul>
          <li><strong>Silverback:</strong> The dominant male who leads and protects the group</li>
          <li><strong>Adult females:</strong> Usually 3-6 females who form the core of the group</li>
          <li><strong>Juveniles and infants:</strong> Young gorillas learning social behaviors</li>
          <li><strong>Blackback males:</strong> Younger males who may eventually leave to form their own groups</li>
        </ul>
        
        <h2>Daily Life and Behaviors</h2>
        <p>Gorillas follow predictable daily patterns that visitors can observe:</p>
        <ul>
          <li><strong>Morning feeding:</strong> Gorillas spend 60% of their day foraging</li>
          <li><strong>Midday rest:</strong> Social grooming and play time</li>
          <li><strong>Afternoon feeding:</strong> Second major feeding period</li>
          <li><strong>Evening nesting:</strong> Building sleeping nests in trees or on ground</li>
        </ul>
        
        <h2>Communication Methods</h2>
        <p>Gorillas use various forms of communication:</p>
        <ul>
          <li><strong>Vocalizations:</strong> Grunts, barks, and screams convey different messages</li>
          <li><strong>Body language:</strong> Chest beating, posturing, and facial expressions</li>
          <li><strong>Scent marking:</strong> Chemical communication through scent</li>
          <li><strong>Touch:</strong> Grooming and physical contact strengthen social bonds</li>
        </ul>
        
        <h2>Conservation Challenges</h2>
        <p>Mountain gorillas face several threats despite conservation efforts:</p>
        <ul>
          <li>Habitat loss due to human encroachment</li>
          <li>Disease transmission from humans</li>
          <li>Climate change affecting food sources</li>
          <li>Political instability in the region</li>
        </ul>
        
        <h2>Conservation Success Stories</h2>
        <p>Thanks to dedicated conservation efforts, mountain gorilla populations are slowly recovering:</p>
        <ul>
          <li>Population increased from 620 in 1989 to over 1,000 today</li>
          <li>Community-based conservation programs</li>
          <li>Tourism revenue supporting protection efforts</li>
          <li>International cooperation between Uganda, Rwanda, and DRC</li>
        </ul>
      `,
      excerpt:
        "Discover fascinating insights into gorilla behavior, social structures, and conservation efforts in Uganda's forests.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Wildlife",
      author: {
        name: "Grace Nakato",
        role: "Gorilla Trekking Specialist",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Grace has led over 200 gorilla trekking expeditions and is passionate about gorilla conservation and education.",
      },
      date: "2024-03-08",
      readTime: "12 min read",
      views: 2890,
      likes: 156,
      tags: ["Gorillas", "Wildlife", "Conservation", "Behavior", "Uganda"],
      featured: true,
    },
    "7": {
      id: 7,
      title: "Uganda's Hidden Gems: Off-the-Beaten-Path Destinations",
      content: `
        <p>Explore lesser-known but equally spectacular destinations that offer authentic experiences away from the crowds. These hidden gems showcase Uganda's incredible diversity.</p>
        
        <h2>Kidepo Valley National Park</h2>
        <p>Located in Uganda's remote northeast, Kidepo offers some of the country's most spectacular wilderness experiences:</p>
        <ul>
          <li>Vast savannah landscapes reminiscent of the Serengeti</li>
          <li>Unique wildlife including cheetahs and ostriches</li>
          <li>Cultural encounters with the Karamojong people</li>
          <li>Minimal tourist crowds for authentic wilderness experience</li>
        </ul>
        
        <h2>Semuliki National Park</h2>
        <p>This lowland tropical rainforest offers unique experiences:</p>
        <ul>
          <li>Hot springs with therapeutic properties</li>
          <li>Central African forest species not found elsewhere in East Africa</li>
          <li>Over 400 bird species including rare forest birds</li>
          <li>Batwa cultural experiences</li>
        </ul>
        
        <h2>Mount Rwenzori National Park</h2>
        <p>The "Mountains of the Moon" offer challenging but rewarding adventures:</p>
        <ul>
          <li>Africa's third-highest peak</li>
          <li>Unique alpine vegetation zones</li>
          <li>Glacial lakes and waterfalls</li>
          <li>Multi-day trekking opportunities</li>
        </ul>
        
        <h2>Pian Upe Wildlife Reserve</h2>
        <p>Uganda's second-largest protected area remains largely unexplored:</p>
        <ul>
          <li>Large herds of zebras and elands</li>
          <li>Traditional Karamojong pastoralist culture</li>
          <li>Excellent bird watching opportunities</li>
          <li>Community-based tourism initiatives</li>
        </ul>
        
        <h2>Ssese Islands</h2>
        <p>Lake Victoria's tropical islands offer relaxation and adventure:</p>
        <ul>
          <li>Beautiful beaches and clear waters</li>
          <li>Forest walks and bird watching</li>
          <li>Fishing and water sports</li>
          <li>Peaceful retreat from mainland activities</li>
        </ul>
        
        <h2>Planning Your Hidden Gems Adventure</h2>
        <p>These destinations require more planning but offer incredible rewards:</p>
        <ul>
          <li>Allow extra time for travel to remote locations</li>
          <li>Pack appropriate gear for varying conditions</li>
          <li>Consider combining multiple hidden gems in one trip</li>
          <li>Work with experienced guides familiar with these areas</li>
        </ul>
      `,
      excerpt:
        "Explore lesser-known but equally spectacular destinations that offer authentic experiences away from the crowds.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Destinations",
      author: {
        name: "Robert Tumusiime",
        role: "Adventure Sports Specialist",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Robert specializes in adventure tourism and has explored every corner of Uganda, discovering hidden gems for adventurous travelers.",
      },
      date: "2024-03-05",
      readTime: "15 min read",
      views: 1950,
      likes: 78,
      tags: ["Hidden Gems", "Adventure", "Exploration", "Off-the-beaten-path", "Uganda"],
      featured: false,
    },
    "8": {
      id: 8,
      title: "Sustainable Tourism: How We're Protecting Uganda's Future",
      content: `
        <p>Learn about our commitment to sustainable tourism practices and how your visit contributes to conservation efforts and community development in Uganda.</p>
        
        <h2>Our Sustainability Philosophy</h2>
        <p>At Samba Tours, we believe that tourism should benefit local communities, protect the environment, and preserve cultural heritage for future generations. Our approach to sustainable tourism is built on three pillars:</p>
        
        <h3>Environmental Conservation</h3>
        <ul>
          <li>Supporting national park conservation through tourism fees</li>
          <li>Minimizing our carbon footprint through efficient travel planning</li>
          <li>Promoting Leave No Trace principles</li>
          <li>Using eco-friendly accommodations and transport</li>
        </ul>
        
        <h3>Community Empowerment</h3>
        <ul>
          <li>Employing local guides and staff</li>
          <li>Sourcing supplies from local businesses</li>
          <li>Supporting community-based tourism initiatives</li>
          <li>Facilitating cultural exchange programs</li>
        </ul>
        
        <h3>Economic Impact</h3>
        <ul>
          <li>Ensuring tourism revenue reaches local communities</li>
          <li>Supporting local artisans and craftspeople</li>
          <li>Investing in community development projects</li>
          <li>Creating sustainable employment opportunities</li>
        </ul>
        
        <h2>Conservation Success Stories</h2>
        <p>Tourism has played a crucial role in Uganda's conservation successes:</p>
        
        <h3>Mountain Gorilla Recovery</h3>
        <p>Tourism revenue has been instrumental in mountain gorilla conservation:</p>
        <ul>
          <li>Funding anti-poaching operations</li>
          <li>Supporting veterinary care for gorillas</li>
          <li>Providing alternative livelihoods for local communities</li>
          <li>Raising international awareness</li>
        </ul>
        
        <h3>Community Conservation Areas</h3>
        <p>Local communities are now active partners in conservation:</p>
        <ul>
          <li>Community-managed conservancies</li>
          <li>Revenue-sharing agreements</li>
          <li>Environmental education programs</li>
          <li>Sustainable livelihood projects</li>
        </ul>
        
        <h2>How You Can Travel Responsibly</h2>
        <p>Every traveler can contribute to sustainable tourism:</p>
        <ul>
          <li>Choose responsible tour operators</li>
          <li>Respect local customs and traditions</li>
          <li>Support local businesses and artisans</li>
          <li>Follow park rules and guidelines</li>
          <li>Minimize waste and environmental impact</li>
        </ul>
        
        <h2>Our Commitments</h2>
        <p>We continuously work to improve our sustainability practices:</p>
        <ul>
          <li>Regular sustainability audits</li>
          <li>Staff training on sustainable practices</li>
          <li>Partnerships with conservation organizations</li>
          <li>Investment in renewable energy and waste reduction</li>
          <li>Transparent reporting on our impact</li>
        </ul>
      `,
      excerpt:
        "Learn about our commitment to sustainable tourism practices and how your visit contributes to conservation efforts.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Conservation",
      author: {
        name: "Mary Atuhaire",
        role: "Cultural Experience Coordinator",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Mary leads our sustainability initiatives and works closely with local communities to ensure tourism benefits everyone.",
      },
      date: "2024-03-03",
      readTime: "9 min read",
      views: 1650,
      likes: 92,
      tags: ["Sustainability", "Conservation", "Community", "Responsible Tourism", "Uganda"],
      featured: false,
    },
    "9": {
      id: 9,
      title: "Birdwatcher's Paradise: Uganda's Avian Diversity",
      content: `
        <p>With over 1,000 bird species, Uganda is a birdwatcher's dream destination. Discover the best locations, species to spot, and tips for successful birding adventures.</p>
        
        <h2>Why Uganda is Special for Birding</h2>
        <p>Uganda's location at the intersection of East and Central African ecosystems creates incredible avian diversity:</p>
        <ul>
          <li>Over 1,060 recorded bird species</li>
          <li>Multiple habitat types supporting different species</li>
          <li>Year-round birding opportunities</li>
          <li>Endemic and near-endemic species</li>
        </ul>
        
        <h2>Top Birding Destinations</h2>
        
        <h3>Bwindi Impenetrable National Park</h3>
        <ul>
          <li>23 Albertine Rift endemic species</li>
          <li>Forest specialists like the African Green Broadbill</li>
          <li>Excellent for forest birding while gorilla trekking</li>
        </ul>
        
        <h3>Queen Elizabeth National Park</h3>
        <ul>
          <li>Over 600 recorded species</li>
          <li>Kazinga Channel boat trips for waterbirds</li>
          <li>Maramagambo Forest for forest species</li>
        </ul>
        
        <h3>Mabamba Swamp</h3>
        <ul>
          <li>Best place to see the iconic Shoebill Stork</li>
          <li>Papyrus endemic species</li>
          <li>Easy day trip from Kampala</li>
        </ul>
        
        <h3>Semuliki National Park</h3>
        <ul>
          <li>Central African forest species</li>
          <li>Over 400 species including rare forest birds</li>
          <li>Unique lowland tropical rainforest habitat</li>
        </ul>
        
        <h2>Must-See Species</h2>
        
        <h3>Iconic Species</h3>
        <ul>
          <li><strong>Shoebill Stork:</strong> Prehistoric-looking wetland giant</li>
          <li><strong>African Green Broadbill:</strong> Rare Albertine endemic</li>
          <li><strong>Great Blue Turaco:</strong> Spectacular forest bird</li>
          <li><strong>African Fish Eagle:</strong> Uganda's national bird</li>
        </ul>
        
        <h3>Endemic and Near-Endemic Species</h3>
        <ul>
          <li>Rwenzori Turaco</li>
          <li>Handsome Francolin</li>
          <li>Rwenzori Batis</li>
          <li>Shelley's Crimsonwing</li>
        </ul>
        
        <h2>Best Birding Times</h2>
        
        <h3>Peak Season (November - April)</h3>
        <ul>
          <li>Migratory species present</li>
          <li>Birds in breeding plumage</li>
          <li>Increased activity and vocalizations</li>
        </ul>
        
        <h3>Year-Round Opportunities</h3>
        <ul>
          <li>Resident species always present</li>
          <li>Different seasons offer different experiences</li>
          <li>Wet season brings lush vegetation and active birds</li>
        </ul>
        
        <h2>Birding Tips for Uganda</h2>
        <ul>
          <li>Start early - dawn chorus is spectacular</li>
          <li>Bring good binoculars and a field guide</li>
          <li>Hire local birding guides for best results</li>
          <li>Be patient - forest birding requires time</li>
          <li>Record bird calls for later identification</li>
        </ul>
        
        <h2>Conservation Through Birding</h2>
        <p>Birding tourism contributes significantly to conservation:</p>
        <ul>
          <li>Funding for habitat protection</li>
          <li>Employment for local guides</li>
          <li>Awareness of conservation needs</li>
          <li>Data collection for research</li>
        </ul>
      `,
      excerpt:
        "With over 1,000 bird species, Uganda is a birdwatcher's dream. Discover the best locations and species to spot.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Birdwatching",
      author: {
        name: "James Okello",
        role: "Senior Safari Guide",
        image: "/placeholder.svg?height=100&width=100",
        bio: "James is an expert birder with over 15 years of experience guiding birdwatching tours across Uganda.",
      },
      date: "2024-03-01",
      readTime: "11 min read",
      views: 1420,
      likes: 65,
      tags: ["Birds", "Wildlife", "Photography", "Birdwatching", "Uganda"],
      featured: false,
    },
    "10": {
      id: 10,
      title: "Local Cuisine Guide: Taste the Flavors of Uganda",
      content: `
        <p>Embark on a culinary journey through Uganda's diverse food culture, from street food to traditional dishes that reflect the country's rich cultural heritage.</p>
        
        <h2>Uganda's Culinary Landscape</h2>
        <p>Ugandan cuisine reflects the country's diverse ethnic groups and abundant natural resources. The food is characterized by:</p>
        <ul>
          <li>Fresh, locally-sourced ingredients</li>
          <li>Staple foods like bananas, cassava, and sweet potatoes</li>
          <li>Rich stews and grilled meats</li>
          <li>Tropical fruits and vegetables</li>
        </ul>
        
        <h2>Must-Try Traditional Dishes</h2>
        
        <h3>Matooke</h3>
        <p>Uganda's national dish made from green bananas:</p>
        <ul>
          <li>Steamed or boiled green bananas</li>
          <li>Often served with meat, fish, or groundnut sauce</li>
          <li>Staple food across the country</li>
          <li>Nutritious and filling</li>
        </ul>
        
        <h3>Posho (Ugali)</h3>
        <ul>
          <li>Cornmeal-based staple food</li>
          <li>Served with various sauces and stews</li>
          <li>Similar to polenta</li>
          <li>Common across East Africa</li>
        </ul>
        
        <h3>Luwombo</h3>
        <ul>
          <li>Traditional steaming method using banana leaves</li>
          <li>Chicken, beef, or fish with vegetables</li>
          <li>Aromatic and flavorful cooking technique</li>
          <li>Special occasion dish</li>
        </ul>
        
        <h3>Groundnut Stew</h3>
        <ul>
          <li>Rich peanut-based sauce</li>
          <li>Served with meat, fish, or vegetables</li>
          <li>Protein-rich and satisfying</li>
          <li>Popular across the country</li>
        </ul>
        
        <h2>Street Food Adventures</h2>
        
        <h3>Rolex</h3>
        <ul>
          <li>Rolled chapati with eggs and vegetables</li>
          <li>Popular street food snack</li>
          <li>Quick and affordable meal</li>
          <li>Available throughout the day</li>
        </ul>
        
        <h3>Samosas</h3>
        <ul>
          <li>Fried pastries with meat or vegetable filling</li>
          <li>Indian influence on Ugandan cuisine</li>
          <li>Perfect snack or appetizer</li>
          <li>Found in markets and street stalls</li>
        </ul>
        
        <h3>Muchomo</h3>
        <ul>
          <li>Grilled meat skewers</li>
          <li>Popular evening street food</li>
          <li>Usually beef or goat meat</li>
          <li>Served with ugali or bread</li>
        </ul>
        
        <h2>Tropical Fruits and Beverages</h2>
        
        <h3>Fresh Fruits</h3>
        <ul>
          <li>Mangoes, pineapples, and papayas</li>
          <li>Passion fruits and jackfruit</li>
          <li>Avocados and bananas</li>
          <li>Available year-round</li>
        </ul>
        
        <h3>Traditional Beverages</h3>
        <ul>
          <li><strong>Malwa:</strong> Traditional millet beer</li>
          <li><strong>Waragi:</strong> Local gin made from bananas</li>
          <li><strong>Fresh fruit juices:</strong> Passion fruit, mango, pineapple</li>
          <li><strong>Tea and coffee:</strong> Uganda produces excellent coffee</li>
        </ul>
        
        <h2>Dining Etiquette</h2>
        <ul>
          <li>Wash hands before eating</li>
          <li>Many dishes are eaten with hands</li>
          <li>Share food as a sign of friendship</li>
          <li>Try everything offered to you</li>
          <li>Compliment the cook</li>
        </ul>
        
        <h2>Where to Experience Ugandan Cuisine</h2>
        <ul>
          <li><strong>Local restaurants:</strong> Authentic traditional dishes</li>
          <li><strong>Street food markets:</strong> Casual and affordable options</li>
          <li><strong>Cultural centers:</strong> Traditional cooking demonstrations</li>
          <li><strong>Home visits:</strong> Most authentic experience</li>
          <li><strong>Safari lodges:</strong> Fusion of local and international cuisine</li>
        </ul>
        
        <h2>Food Safety Tips</h2>
        <ul>
          <li>Choose busy restaurants with high turnover</li>
          <li>Ensure meat is well-cooked</li>
          <li>Drink bottled or boiled water</li>
          <li>Peel fruits yourself</li>
          <li>Be cautious with dairy products</li>
        </ul>
      `,
      excerpt:
        "Embark on a culinary journey through Uganda's diverse food culture, from street food to traditional dishes.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Culture",
      author: {
        name: "Sarah Namukasa",
        role: "Operations Manager",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Sarah is passionate about Ugandan culture and cuisine, often organizing cultural food experiences for travelers.",
      },
      date: "2024-02-28",
      readTime: "8 min read",
      views: 2100,
      likes: 134,
      tags: ["Food", "Culture", "Local Experience", "Traditional Cuisine", "Uganda"],
      featured: false,
    },
  }

  return posts[id as keyof typeof posts] || null
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Samba Tours Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-cream-50">
      <BlogPostHeader post={post} />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <BlogPostContent post={post} />

              <Suspense fallback={<LoadingSpinner />}>
                <BlogComments postId={post.id} />
              </Suspense>
            </div>

            <div className="lg:col-span-1">
              <Suspense fallback={<LoadingSpinner />}>
                <BlogPostSidebar post={post} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <RelatedPosts currentPost={post} />
      </Suspense>
    </main>
  )
}
