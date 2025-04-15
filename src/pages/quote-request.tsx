import { Link } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { useQuoteStore } from "@/lib/store";
import { Trash2, ArrowRight } from "lucide-react";

const QuoteRequestPage = () => {
  const { items, removeItem } = useQuoteStore();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Request a Quote</h1>
            <p className="mt-2 text-slate-300">
              Fill out the form below to receive a personalized quote for your selected products
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Your Information</h2>
                  <QuoteRequestForm />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Selected Products</h2>
                  
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-slate-500 mb-4">Your quote cart is empty</p>
                      <Link to="/products">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Browse Products
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-20 h-20 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.images[0] || "https://placehold.co/80x80?text=No+Image"} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-slate-500 capitalize">{item.category}</p>
                            <p className="text-sm font-medium text-orange-500">{item.priceRange}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Items:</span>
                        <span>{items.length}</span>
                      </div>
                      
                      <Link to="/products">
                        <Button variant="outline" className="w-full mt-2">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Add More Products
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuoteRequestPage;