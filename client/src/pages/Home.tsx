import { useEffect, useState } from 'react';
import { getProducts, Product } from '../api/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import ProductGrid from '../components/home/ProductGrid';
import FeaturesSection from '../components/home/FeaturesSection';
import SectionTitle from '../components/ui/SectionTitle';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroBanner />
        
        <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Products"
            subtitle="Discover our handpicked selection of premium clothing"
          />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg text-muted-foreground">Loading products...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-destructive">Error: {error}</div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </section>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
