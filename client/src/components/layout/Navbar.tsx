import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import CartDrawer from '../cart/CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight">FASHION</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Shop
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4">
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
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-4 pb-4 pt-4">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link to="/admin/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;

