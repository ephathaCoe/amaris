import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, CheckCircle } from "lucide-react";
import { useQuoteStore, type Product } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInQuote } = useQuoteStore();
  const isAdded = isInQuote(product.id);

  const handleAddToQuote = () => {
    addItem(product);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.images[0] || "https://placehold.co/400x400?text=No+Image"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm line-clamp-2">{product.description}</p>
        <p className="mt-2 font-semibold">{product.priceRange}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Button 
          onClick={handleAddToQuote}
          disabled={isAdded}
          className={isAdded ? "bg-green-600 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-600"}
        >
          {isAdded ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <PlusCircle className="h-5 w-5" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}