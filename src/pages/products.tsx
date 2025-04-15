import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategory, type Product } from "@/lib/store";

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    
    const filteredProducts = getProductsByCategory(category);
    setProducts(filteredProducts);
  }, [location.search]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Our Products</h1>
            <p className="mt-2 text-slate-300">
              Browse our extensive range of heavy machinery and generators
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <CategoryFilter />
          <ProductGrid products={products} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;