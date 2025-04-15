import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getProductById, useQuoteStore } from "@/lib/store";
import { ArrowLeft, Check, PlusCircle, FileText } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, isInQuote } = useQuoteStore();
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const isProductInQuote = isInQuote(product.id);
  
  const handleAddToQuote = () => {
    addItem(product);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/products" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[activeImage] || "https://placehold.co/800x800?text=No+Image"} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded border-2 overflow-hidden ${
                        activeImage === index ? "border-orange-500" : "border-transparent"
                      }`}
                    >
                      <img 
                        src={image || "https://placehold.co/100x100?text=No+Image"} 
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="capitalize bg-slate-700">{product.category}</Badge>
                  {product.subcategory && (
                    <Badge className="capitalize bg-slate-500">{product.subcategory}</Badge>
                  )}
                </div>
                <p className="text-xl font-semibold text-orange-500 mb-4">{product.priceRange}</p>
                <p className="text-slate-600">{product.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={handleAddToQuote}
                  disabled={isProductInQuote}
                  className={`flex-1 ${isProductInQuote ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"}`}
                >
                  {isProductInQuote ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Quote
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Add to Quote
                    </>
                  )}
                </Button>
                
                <Link to="/quote-request" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-5 w-5" />
                    View Quote Cart
                  </Button>
                </Link>
              </div>
              
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Specifications</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="specifications">Detailed Specifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Features & Benefits</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="applications" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Common Applications</h2>
              <ul className="space-y-2">
                {product.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Detailed Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <p className="text-slate-600 capitalize text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-slate-100 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Need More Information?</h2>
            <p className="mb-4">Our product specialists are ready to answer your questions and provide custom quotes.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button variant="outline">Contact Sales</Button>
              </Link>
              <Button 
                onClick={handleAddToQuote}
                disabled={isProductInQuote}
                className={isProductInQuote ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"}
              >
                {isProductInQuote ? "Added to Quote" : "Request a Quote"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;