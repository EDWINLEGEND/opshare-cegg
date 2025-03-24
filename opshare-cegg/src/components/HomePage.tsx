import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Clock, Gift, MessageCircle, ShieldCheck, Leaf } from 'lucide-react';
import Hero from './Hero';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section (already implemented) */}
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How OpShare Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sharing with your community has never been easier. Follow these simple steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Account</h3>
              <p className="text-gray-600">
                Sign up for free and join thousands of neighbors already sharing resources.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">List or Browse Items</h3>
              <p className="text-gray-600">
                Share your underutilized items or find what you need from nearby neighbors.
              </p>
            </div>
            
            <div className="text-center bg-gray-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect & Share</h3>
              <p className="text-gray-600">
                Arrange pickup or delivery through our secure messaging system.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works" className="inline-flex items-center text-green font-medium">
              Learn more about how OpShare works
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need or discover new sharing opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Tools & Equipment', icon: '🔨', color: 'bg-blue-50 text-blue-600' },
              { name: 'Outdoor Gear', icon: '🏕️', color: 'bg-green-50 text-green-600' },
              { name: 'Electronics', icon: '📱', color: 'bg-purple-50 text-purple-600' },
              { name: 'Home & Kitchen', icon: '🏠', color: 'bg-yellow-50 text-yellow-600' },
              { name: 'Sports & Fitness', icon: '🏓', color: 'bg-red-50 text-red-600' },
              { name: 'Party Supplies', icon: '🎉', color: 'bg-pink-50 text-pink-600' },
              { name: 'Kids & Toys', icon: '🧸', color: 'bg-indigo-50 text-indigo-600' },
              { name: 'View All Categories', icon: '➕', color: 'bg-gray-100 text-gray-600' }
            ].map((category, index) => (
              <Link key={index} to={`/browse/${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                <div className={`${category.color} rounded-xl p-6 text-center transition-all group-hover:shadow-md`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Items Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Popular Items Near You</h2>
            <Link to="/browse" className="text-green font-medium flex items-center">
              View all
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Electric Drill', 
                price: 8.99, 
                period: 'day', 
                image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                distance: '0.8 miles away'
              },
              { 
                title: 'Camping Tent (4-Person)', 
                price: 25.00, 
                period: 'day', 
                image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                distance: '1.2 miles away'
              },
              { 
                title: 'Stand Mixer', 
                price: 12.50, 
                period: 'day', 
                image: 'https://images.unsplash.com/photo-1594634932563-682ab33e203a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                distance: '0.5 miles away'
              },
              { 
                title: 'Mountain Bike', 
                price: 15.99, 
                period: 'day', 
                image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                distance: '1.7 miles away'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-green-700 font-bold">${item.price}/{item.period}</p>
                    <p className="text-xs text-gray-500">{item.distance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose OpShare?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              More than just a sharing platform - we're building a community-driven sustainable future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Environmentally Friendly</h3>
              <p className="text-gray-600">
                Reduce waste and carbon emissions by sharing resources instead of buying new items.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save Money</h3>
              <p className="text-gray-600">
                Access items you need without the high cost of purchasing them outright.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Community</h3>
              <p className="text-gray-600">
                Connect with neighbors and strengthen local ties through sharing and collaboration.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Our platform offers secure payments, verification systems, and protection policies.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Terms</h3>
              <p className="text-gray-600">
                Choose rental durations that work for you, from hourly to monthly options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Extra Income</h3>
              <p className="text-gray-600">
                Turn your unused items into a source of passive income by renting them out.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied members who are already sharing resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah K.",
                role: "Homeowner",
                quote: "OpShare has saved me thousands of dollars on tools I only need occasionally. Plus, I've met so many helpful neighbors!",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                name: "Marcus T.",
                role: "Student",
                quote: "As a college student, renting textbooks and electronics through OpShare has been a game-changer for my budget.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Elena R.",
                role: "Small Business Owner",
                quote: "I've turned my rarely-used equipment into a nice side income by renting through OpShare. It's been amazing!",
                image: "https://randomuser.me/api/portraits/women/45.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl relative">
                <div className="text-green text-4xl absolute top-6 left-6 opacity-20">"</div>
                <div className="relative z-10">
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Stats Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Collective Impact</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Together, we're making a difference through the power of sharing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">10,000+</p>
              <p className="text-xl md:text-2xl opacity-80">Items Shared</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">5,000+</p>
              <p className="text-xl md:text-2xl opacity-80">Active Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">$2.4M+</p>
              <p className="text-xl md:text-2xl opacity-80">Money Saved</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold mb-2">50+ tons</p>
              <p className="text-xl md:text-2xl opacity-80">CO2 Prevented</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about using OpShare.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does OpShare protect both lenders and borrowers?",
                answer: "OpShare uses a verification system, security deposits, and insurance options to protect all users. Our community ratings also help establish trust between members."
              },
              {
                question: "What happens if an item is damaged during rental?",
                answer: "Borrowers are responsible for items while in their possession. Security deposits and our damage protection policy help cover potential issues. We also have a resolution center to help mediate any disputes."
              },
              {
                question: "How do payments work on OpShare?",
                answer: "OpShare uses a secure payment system. When you rent an item, the payment is held until the rental period is complete, ensuring protection for both parties."
              },
              {
                question: "Is there a membership fee to join OpShare?",
                answer: "Basic membership is completely free! We offer premium subscription options with added benefits for frequent users or those with many items to share."
              },
              {
                question: "How far can I browse items to borrow?",
                answer: "You can set your own search radius, ranging from 1 to 50 miles from your location. Most users find the best experience within 5-10 miles for easy pickup and return."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/faq" className="inline-flex items-center text-green font-medium">
              View all FAQs
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start sharing?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community today and discover the benefits of a sharing economy. 
              Save money, reduce waste, and connect with your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="btn-primary py-3 px-8 text-lg"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/browse" 
                className="btn-ghost py-3 px-8 text-lg"
              >
                Browse Items First
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - would be another component */}
    </div>
  );
};

export default HomePage; 