import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">About Amaris</h1>
            <p className="mt-2 text-slate-300">
              Your trusted partner for heavy machinery and power solutions
            </p>
          </div>
        </div>
        
        {/* Company Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Company</h2>
                <p className="mb-4 text-slate-600">
                  Founded in 1985, Amaris has grown to become a leading supplier of heavy machinery and generators for the construction, mining, and manufacturing industries across the nation.
                </p>
                <p className="mb-4 text-slate-600">
                  With over 35 years of experience, we've built our reputation on providing reliable equipment, exceptional customer service, and comprehensive after-sales support.
                </p>
                <p className="text-slate-600">
                  Our team of industry experts is dedicated to understanding your specific needs and helping you find the right equipment solutions to maximize productivity and efficiency.
                </p>
              </div>
              <div className="bg-slate-200 h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Amaris headquarters"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission & Values */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We're committed to providing high-quality equipment that helps our clients succeed in their industries
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-500">Our Mission</h3>
                <p className="text-slate-600">
                  To provide reliable, high-performance machinery and power solutions that enable our customers to achieve operational excellence and business success.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-500">Our Vision</h3>
                <p className="text-slate-600">
                  To be the most trusted partner for industrial equipment solutions, recognized for our expertise, quality products, and exceptional service.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-orange-500">Our Values</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Integrity in all business dealings</li>
                  <li>• Excellence in product quality and service</li>
                  <li>• Customer satisfaction as our top priority</li>
                  <li>• Innovation in solutions and processes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Meet the experienced professionals who guide our company
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Michael Johnson",
                  position: "Chief Executive Officer",
                  image: "https://randomuser.me/api/portraits/men/32.jpg"
                },
                {
                  name: "Sarah Williams",
                  position: "Chief Operations Officer",
                  image: "https://randomuser.me/api/portraits/women/44.jpg"
                },
                {
                  name: "David Chen",
                  position: "Sales Director",
                  image: "https://randomuser.me/api/portraits/men/67.jpg"
                },
                {
                  name: "Lisa Rodriguez",
                  position: "Technical Director",
                  image: "https://randomuser.me/api/portraits/women/28.jpg"
                }
              ].map((person, index) => (
                <div key={index} className="text-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">{person.name}</h3>
                  <p className="text-slate-500">{person.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-12 bg-orange-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Contact our team today to discuss your equipment needs and get expert recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-slate-100">
                  Browse Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;