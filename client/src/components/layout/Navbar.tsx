import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../contexts/CartContext';
import CartDrawer from '../cart/CartDrawer';
import SearchDrawer from '../search/SearchDrawer';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { t } = useTranslation();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="FASHION Logo" 
                className="w-[170px] h-[130px] object-contain"
                style={{ aspectRatio: '2 / 2' }}
                onError={(e) => {
                  // Fallback to other formats if png doesn't exist
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('.png')) {
                    target.src = '/images/logo.jpg';
                  } else if (target.src.includes('.jpg')) {
                    target.src = '/images/logo.svg';
                  }
                }}
              />
            </Link>

            {/* Center Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8 rtl:space-x-reverse">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {t('navbar.home')}
              </Link>
              <Link
                to="/#contact"
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {t('navbar.contactUs')}
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="relative"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center space-x-6 rtl:space-x-reverse py-2 border-t">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/#contact"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t('navbar.contactUs')}
            </Link>
          </div>
        </div>
      </nav>
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;

