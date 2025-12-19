import { useEffect, useState } from 'react';
import { getProducts, Product } from '../api/products';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import ProductGrid from '../components/home/ProductGrid';
import FeaturesSection from '../components/home/FeaturesSection';
import SectionTitle from '../components/ui/SectionTitle';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

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
            title={t('home.featuredProducts')}
            subtitle={t('home.featuredProductsSubtitle')}
          />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg text-muted-foreground">{t('home.loadingProducts')}</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-destructive">{t('common.error')}: {error}</div>
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
