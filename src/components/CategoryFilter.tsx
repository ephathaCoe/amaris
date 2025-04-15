import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/store";

export function CategoryFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = getCategories();
  
  // Parse the current category from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setActiveCategory(category);
  }, [location.search]);
  
  const handleCategoryClick = (category: string | null) => {
    if (category === activeCategory) {
      // If clicking the active category, clear the filter
      setActiveCategory(null);
      navigate('/products');
    } else {
      // Set the new category filter
      setActiveCategory(category);
      navigate(`/products?category=${category}`);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === null ? "default" : "outline"}
        onClick={() => handleCategoryClick(null)}
        className={activeCategory === null ? "bg-orange-500 hover:bg-orange-600" : ""}
      >
        All Products
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryClick(category)}
          className={`capitalize ${activeCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}