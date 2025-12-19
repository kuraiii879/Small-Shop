import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, Product } from '../api/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductGallery from '../components/product/ProductGallery';
import ProductOrderForm from '../components/product/ProductOrderForm';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg text-muted-foreground">Loading product...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-destructive mb-4">Error: {error || 'Product not found'}</div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - First on mobile, second on desktop */}
          <div className="order-1 lg:order-2">
            <ProductGallery
              imageUrls={product.imageUrls || (product.imageUrl ? [product.imageUrl] : [])}
              productName={product.name}
            />
          </div>

          {/* Product Info and Order Form - Second on mobile, first on desktop */}
          <div className="order-2 lg:order-1">
            <ProductOrderForm product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
