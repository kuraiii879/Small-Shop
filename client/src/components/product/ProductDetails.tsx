import { Product } from '../../api/products';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Category</h4>
            <p className="text-muted-foreground">{product.category}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Availability</h4>
            <p className="text-muted-foreground">
              {product.inStock
                ? `In Stock (${product.stockQuantity} available)`
                : 'Out of Stock'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">SKU</h4>
            <p className="text-muted-foreground">{product._id}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Added</h4>
            <p className="text-muted-foreground">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;

