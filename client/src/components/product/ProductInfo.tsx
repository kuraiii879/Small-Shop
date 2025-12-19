import { useState } from 'react';
import { Product } from '../../api/products';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import PriceTag from '../ui/PriceTag';
import { ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {product.name}
        </h1>
        <PriceTag price={product.price} className="mb-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Select Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 py-2 border rounded-md text-sm font-medium transition-colors",
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input hover:border-primary hover:text-primary"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full"
          disabled={!product.inStock || !selectedSize}
          onClick={() => {
            if (product.inStock && selectedSize) {
              addToCart(product, selectedSize);
            }
          }}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {!selectedSize
            ? 'Select a Size'
            : product.inStock
            ? 'Add to Cart'
            : 'Out of Stock'}
        </Button>
        {product.inStock && (
          <p className="text-sm text-muted-foreground text-center">
            {product.stockQuantity} items in stock
          </p>
        )}
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-sm font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;

