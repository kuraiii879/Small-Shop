import { Link } from 'react-router-dom';
import { Product } from '../../api/products';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import PriceTag from '../ui/PriceTag';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  // Support both imageUrls array and imageUrl string for backward compatibility
  const imageUrls = product.imageUrls || (product.imageUrl ? [product.imageUrl] : []);
  const firstImage = imageUrls.length > 0 ? imageUrls[0] : null;
  const imageUrl = firstImage ? `http://localhost:5000${firstImage}` : null;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm px-4 py-1">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <PriceTag price={product.price} />
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <Button
          className="w-full"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (product.inStock) {
              addToCart(product);
            }
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? 'Buy Now' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

