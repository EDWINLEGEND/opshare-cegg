import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search, MessageCircle, Calendar, CreditCard,
  ArrowRight, CheckCircle, ShieldCheck, HelpCircle,
  Star, Users, Leaf, DollarSign, Truck, Package, Coins, Award, Target, Check, RefreshCw
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How OpShare Works</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Our platform makes it easy to share, rent, and sell items in your community.
            Here's everything you need to know to get started.
          </p>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The OpShare Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're looking to borrow, rent, or buy items, our platform makes it simple.
              Here's how it works in four easy steps:
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-100"></div>

            {/* Step 1 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        1
                      </div>
                      <h3 className="text-2xl font-bold">Find What You Need</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Browse thousands of items available in your community. Use our search and filter
                      options to find exactly what you're looking for by category, location, price,
                      and availability.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Search by keyword or browse categories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Filter by distance, price, and availability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>View detailed item descriptions and photos</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -left-16 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <img
                        src="https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Person searching for items on a laptop"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Search className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold">Search & Discover</h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Our intuitive search helps you find exactly what you need, when you need it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative mb-16">
              <div className="md:flex items-center flex-row-reverse">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        2
                      </div>
                      <h3 className="text-2xl font-bold">Connect & Arrange</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Once you find what you need, message the owner directly through our secure
                      messaging system. Ask questions, negotiate terms, and arrange pickup or delivery.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Secure in-app messaging protects your privacy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Discuss rental periods, condition, and usage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Arrange convenient pickup or delivery options</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -right-16 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="People messaging and arranging a meetup"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold">Secure Communication</h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Our messaging system keeps your personal information private while facilitating easy communication.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative mb-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        3
                      </div>
                      <h3 className="text-2xl font-bold">Book & Pay Securely</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Complete your transaction through our secure payment system. Choose rental
                      dates, review terms, and pay with confidence knowing your transaction is protected.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Secure payment processing with multiple options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Clear rental agreements and terms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Optional damage protection for peace of mind</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -left-16 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Person completing a secure payment on phone"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold">Secure Transactions</h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Our payment system protects both parties and only releases funds when terms are met.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="md:flex items-center flex-row-reverse">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        4
                      </div>
                      <h3 className="text-2xl font-bold">Use & Return</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Pick up or receive your item, use it for your agreed rental period, and return it
                      in the same condition. Leave a review to help build trust in our community.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Clear return instructions and expectations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Extension options if you need more time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Review system builds community trust</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -right-16 transform -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Person returning a borrowed item"
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold">Easy Returns</h4>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Return the item on time and in good condition to maintain your positive rating.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Borrowers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
              For Borrowers & Buyers
            </span>
            <h2 className="text-3xl font-bold mb-4">Why Borrow Instead of Buy?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Save money, reduce clutter, and help the environment by borrowing items you only need occasionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-6">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save Money</h3>
              <p className="text-gray-600">
                Why buy expensive items you'll only use a few times? Renting typically costs 5-15% of the purchase price,
                saving you hundreds or even thousands of dollars on specialty items.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reduce Environmental Impact</h3>
              <p className="text-gray-600">
                Every shared item means one less item manufactured. Sharing reduces resource consumption,
                packaging waste, and carbon emissions associated with production and shipping.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-6">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Declutter Your Space</h3>
              <p className="text-gray-600">
                Access what you need without storing rarely-used items. Free up valuable space in your home
                while still having access to everything you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Lenders Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
              For Lenders & Sellers
            </span>
            <h2 className="text-3xl font-bold mb-4">Turn Your Unused Items Into Income</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Make money from items you already own by sharing them with your community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Person listing items on OpShare"
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 h-12 w-12 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Earn Extra Income</h3>
                  <p className="text-gray-600">
                    The average lender on OpShare earns $120-$300 per month from items they already own.
                    Popular items like power tools, cameras, and outdoor equipment can pay for themselves many times over.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 h-12 w-12 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Build Community</h3>
                  <p className="text-gray-600">
                    Connect with neighbors and build relationships through sharing. Many of our lenders report
                    making valuable connections and friendships through the platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 h-12 w-12 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Lender Protection</h3>
                  <p className="text-gray-600">
                    Our platform includes verification systems, secure payments, and optional damage protection.
                    You control who borrows your items and set your own terms and conditions.
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard/sell"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Start Sharing Your Items
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
              Trust & Safety
            </span>
            <h2 className="text-3xl font-bold mb-4">Your Security Is Our Priority</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              OpShare is built on trust and transparency. Here's how we keep our community safe:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Users</h3>
              <p className="text-gray-600">
                All users undergo ID verification and profile review before joining our community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Review System</h3>
              <p className="text-gray-600">
                Our two-way review system ensures accountability and helps build a trusted community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                All transactions are processed through our secure payment system with fraud protection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-50 h-14 w-14 rounded-full flex items-center justify-center text-green-600 mb-4">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our support team is available around the clock to assist with any issues or questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Still have questions? Here are answers to our most common inquiries.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">What happens if an item is damaged?</h3>
              <p className="text-gray-600">
                If an item is damaged during a rental period, our resolution center helps facilitate
                communication between parties. For eligible items covered by our optional protection plan,
                we'll help cover repair or replacement costs according to our terms of service.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">How do I know if I can trust a borrower?</h3>
              <p className="text-gray-600">
                All users on OpShare are verified with ID checks and maintain a review history.
                You can view a borrower's profile, ratings, and past transaction history before accepting
                their request. You always have the final say on who can borrow your items.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">What types of items can I share on OpShare?</h3>
              <p className="text-gray-600">
                You can share almost anything that's legal and safe to use. Popular categories include tools,
                outdoor gear, electronics, party supplies, home goods, and sporting equipment. Items prohibited
                from our platform include weapons, illegal substances, and certain high-risk items.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">How much should I charge for my items?</h3>
              <p className="text-gray-600">
                We recommend charging 3-5% of the item's retail value per day, or 15-25% per week.
                Our platform will suggest optimal pricing based on similar items in your area, but you
                have complete control to set your own rates.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/faq" className="text-green-600 font-medium flex items-center justify-center gap-1 hover:text-green-700">
              View all FAQs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* Credit System Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Sustainability Credit System</h2>

        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-sm border border-green-100">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">TreeCoin Credit System</h3>
              <p className="text-gray-600">Earn rewards while helping the environment</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Coins className="h-5 w-5 text-amber-500 mr-2" />
                How Credits Work
              </h4>
              <ul className="space-y-3">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">Leaf Credits:</span> Earn 1 Leaf for every sustainable action on OpShare
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">TreeCoins:</span> 1000 Leafs = 1 TreeCoin, our premium sustainability currency
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium">Eco Score:</span> Measures your environmental impact as you share resources
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Award className="h-5 w-5 text-purple-500 mr-2" />
                How to Earn Credits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="font-medium mb-1">Lending Items</div>
                  <p className="text-sm text-gray-600">Earn 10 Leafs for each day your item is borrowed</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="font-medium mb-1">Borrowing Items</div>
                  <p className="text-sm text-gray-600">Earn 5 Leafs for choosing to borrow instead of buy</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="font-medium mb-1">Completing Missions</div>
                  <p className="text-sm text-gray-600">Earn 15-50 Leafs for completing sustainability missions</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="font-medium mb-1">Positive Reviews</div>
                  <p className="text-sm text-gray-600">Earn 5 Leafs for each 5-star review you receive</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-2" />
                Missions & Rewards
              </h4>
              <div className="space-y-4">
                <p className="text-gray-700">Complete missions to earn extra credits and improve your Eco Score:</p>

                <div className="space-y-3">
                  <div className="flex items-center p-3 border border-blue-100 rounded-md bg-blue-50">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <RefreshCw className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Resource Saver</div>
                      <div className="text-sm text-gray-600">Borrow 5 different items in one month</div>
                    </div>
                    <div className="ml-auto font-medium text-green-600">+25 Leafs</div>
                  </div>

                  <div className="flex items-center p-3 border border-purple-100 rounded-md bg-purple-50">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <RefreshCw className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Community Champion</div>
                      <div className="text-sm text-gray-600">Lend items to 10 different users</div>
                    </div>
                    <div className="ml-auto font-medium text-green-600">+50 Leafs</div>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mt-4">
                  <h5 className="font-medium flex items-center text-amber-800">
                    <Coins className="h-4 w-4 mr-2 text-amber-600" />
                    Using TreeCoins
                  </h5>
                  <p className="text-sm text-amber-700 mt-1">
                    TreeCoins can be used for rental discounts, premium listings, and exclusive sustainable products in our marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="/missions-and-rewards" className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
              View Your Missions & Rewards
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Other How It Works sections would go here */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Other Platform Features</h2>

        {/* Additional sections about how the platform works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Lending Your Items</h3>
            <p className="text-gray-600 mb-4">
              Transform your unused items into a source of income while helping others and the environment.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>List items in minutes with our easy process</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Set your own pricing and availability</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Our insurance protection for peace of mind</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Borrowing Items</h3>
            <p className="text-gray-600 mb-4">
              Access the things you need without having to buy, store, and maintain them.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Browse thousands of items in your neighborhood</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Request items and communicate with owners</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Pickup locally or request delivery options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of people already sharing and saving in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Create an Account
            </Link>
            <Link
              to="/browse"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>
    </div>

  );
};

export default HowItWorks; 
