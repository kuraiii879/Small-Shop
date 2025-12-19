import { useCart } from '../../contexts/CartContext';
import Drawer from '../ui/drawer';
import { Button } from '../ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import PriceTag from '../ui/PriceTag';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">Your cart is empty</p>
          <p className="text-muted-foreground mb-4">Add some items to get started</p>
          <Link to="/" onClick={onClose}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-4">
            {items.map((item) => {
              const imageUrls = item.product.imageUrls || (item.product.imageUrl ? [item.product.imageUrl] : []);
              const firstImage = imageUrls.length > 0 ? imageUrls[0] : null;
              const imageUrl = firstImage ? `http://localhost:5000${firstImage}` : null;

              return (
                <div key={`${item.product._id}-${item.size || 'default'}`} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    {item.size && (
                      <p className="text-xs text-muted-foreground mb-1">Size: {item.size}</p>
                    )}
                    <PriceTag price={item.product.price} className="mb-2" />
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1, item.size)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1, item.size)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeFromCart(item.product._id, item.size)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t pt-4 mt-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Link to="/" onClick={onClose} className="flex-1">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button className="flex-1">
                Checkout ({getTotalItems()})
              </Button>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;

