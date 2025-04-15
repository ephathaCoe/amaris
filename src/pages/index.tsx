import { Link } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, getCategories } from "@/lib/store";
import { ArrowRight, Check, Truck, Wrench, Clock } from "lucide-react";

const Index = () => {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);
  const categories = getCategories();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powering Industries with Reliable Machinery
            </h1>
            <p className="text-xl mb-8">
              Premium heavy machinery and generators for construction, mining, and manufacturing. Built to perform in the most demanding environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Explore Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Equipment Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse our extensive range of heavy machinery and power solutions for every industrial need
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/products?category=${category}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all group-hover:shadow-xl">
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                      <h3 className="text-white text-xl font-bold p-6 capitalize">{category}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <span className="text-slate-600">View Products</span>
                    <ArrowRight className="text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Equipment</h2>
            <Link to="/products">
              <Button variant="outline" className="flex items-center gap-2">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Amaris</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We're committed to providing the highest quality machinery backed by exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-lg">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-slate-300">
                All our machinery is sourced from leading manufacturers and undergoes rigorous quality testing.
              </p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-lg">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Nationwide Delivery</h3>
              <p className="text-slate-300">
                We deliver and install equipment across the country with our specialized transport fleet.
              </p>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-lg">
              <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Wrench size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-slate-300">
                Our team of technicians provides comprehensive maintenance and repair services.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Ready to power your operations?</h2>
              <p className="text-lg">Contact our sales team for personalized equipment recommendations.</p>
            </div>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-slate-100">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;