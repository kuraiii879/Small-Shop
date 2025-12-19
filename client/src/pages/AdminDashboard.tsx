import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../api/auth';
import { Button } from '../components/ui/button';
import { LogOut, ExternalLink, Package, ShoppingBag } from 'lucide-react';
import ProductsTab from '../components/admin/ProductsTab';
import OrdersTab from '../components/admin/OrdersTab';
import { cn } from '../lib/utils';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Store
                </Button>
              </Link>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('products')}
              className={cn(
                "px-4 py-2 border-b-2 font-medium transition-colors flex items-center gap-2",
                activeTab === 'products'
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Package className="h-4 w-4" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={cn(
                "px-4 py-2 border-b-2 font-medium transition-colors flex items-center gap-2",
                activeTab === 'orders'
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab />}
      </main>
    </div>
  );
};

export default AdminDashboard;
