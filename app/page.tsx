export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍰</span>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-pink-800">Sweer Meraki</h1>
                <p className="text-sm text-pink-600">by Hanshika</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#cakes" className="text-pink-700 hover:text-pink-900 font-medium">Our Cakes</a>
              <a href="#about" className="text-pink-700 hover:text-pink-900 font-medium">About Us</a>
              <a href="#contact" className="text-pink-700 hover:text-pink-900 font-medium">Contact</a>
              <a href="/login" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                Order Now
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-pink-900 mb-6">
              Sweet Dreams Come True
            </h1>
            <p className="text-xl text-pink-700 mb-8 max-w-3xl mx-auto">
              Indulge in our handcrafted cakes made with love and the finest ingredients.
              Each cake is a masterpiece, baked fresh just for you.
            </p>
            <div className="space-x-4">
              <a href="/login" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl">
                Start Your Order
              </a>
              <button className="bg-white hover:bg-pink-50 text-pink-900 font-semibold py-4 px-8 rounded-full text-lg border-2 border-pink-300 transition duration-300">
                View Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Featured Cakes */}
        <section id="cakes" className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-pink-900 mb-4">Our Signature Cakes</h2>
              <p className="text-lg text-pink-700 max-w-2xl mx-auto">
                Discover our most loved creations, each telling its own sweet story
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                  <span className="text-6xl">🎂</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pink-900 mb-2">Red Velvet Dream</h3>
                  <p className="text-pink-700 mb-4">Velvety smooth chocolate cake with cream cheese frosting</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">$45</span>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-rose-200 to-rose-300 flex items-center justify-center">
                  <span className="text-6xl">🧁</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pink-900 mb-2">Strawberry Bliss</h3>
                  <p className="text-pink-700 mb-4">Fresh strawberry cake with vanilla buttercream</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">$38</span>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
                  <span className="text-6xl">🍰</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-pink-900 mb-2">Chocolate Heaven</h3>
                  <p className="text-pink-700 mb-4">Rich chocolate cake with ganache and berries</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-pink-600">$52</span>
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-pink-900 mb-8">About Sweer Meraki</h2>
            <p className="text-lg text-pink-700 mb-8 leading-relaxed">
              At Sweer Meraki by Hanshika, we believe that every celebration deserves a cake that's as special as the moment itself.
              Our passion for baking comes from years of perfecting recipes and creating memories. Each cake is handcrafted with
              love, using only the finest ingredients to ensure every bite is pure bliss.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Quality First</h3>
                <p className="text-pink-700">Premium ingredients and traditional baking methods</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Custom Designs</h3>
                <p className="text-pink-700">Personalized cakes for every occasion and preference</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Fresh Delivery</h3>
                <p className="text-pink-700">Carefully packaged and delivered fresh to your door</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-800 font-bold">🍰</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sweer Meraki</h3>
                  <p className="text-pink-200">by Hanshika</p>
                </div>
              </div>
              <p className="text-pink-200">
                Crafting sweet memories, one cake at a time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-pink-200">
                <li><a href="#cakes" className="hover:text-white">Our Cakes</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="/login" className="hover:text-white">Order Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-pink-200">
                <li>📞 +1 (555) 123-4567</li>
                <li>📧 hello@sweermeraki.com</li>
                <li>📍 123 Bakery Street, Sweet City</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-pink-200 hover:text-white text-2xl">📘</a>
                <a href="#" className="text-pink-200 hover:text-white text-2xl">📷</a>
                <a href="#" className="text-pink-200 hover:text-white text-2xl">🐦</a>
              </div>
            </div>
          </div>
          <div className="border-t border-pink-700 mt-8 pt-8 text-center text-pink-200">
            <p>&copy; 2024 Sweer Meraki by Hanshika. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
