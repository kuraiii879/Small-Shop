import { useState, FormEvent } from 'react';
import { Product } from '../../api/products';
import { Button } from '../ui/button';
import { Check, Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { createOrder, OrderItem } from '../../api/orders';
import { useNavigate } from 'react-router-dom';
import { getColorHex } from '../../lib/colors';

interface ProductOrderFormProps {
  product: Product;
}

const ProductOrderForm = ({ product }: ProductOrderFormProps) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sizes = ['M', 'L', 'XL', '2XL', '3XL'];
  const colors = product.colors || ['Black', 'White', 'Gray', 'Navy', 'Green'];
  const deliveryFee = 8;
  const originalPrice = product.price * 1.4; // Assuming 30% discount
  const discountedPrice = product.price;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedSize) {
      setError('Please select a size');
      return;
    }

    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    if (!customerName || !customerPhone || !customerAddress) {
      setError('Please fill in all customer information fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems: OrderItem[] = [{
        product: product._id,
        productName: product.name,
        quantity,
        size: selectedSize,
        color: selectedColor,
        price: discountedPrice
      }];

      await createOrder({
        customerName,
        customerPhone,
        customerAddress,
        items: orderItems,
        deliveryFee
      });

      // Show success and redirect
      alert('Order placed successfully!');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl font-bold mb-4 underline">{product.name}</h1>
        
        {/* Features */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Tailles: {sizes.join('/')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Tissu: {product.category}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Prix: {discountedPrice.toFixed(1)}DT + {deliveryFee}DT frais de livraison</span>
          </div>
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <label className="block text-sm font-semibold mb-2">Tailles:</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 py-2 border rounded text-sm font-medium transition-colors",
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

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-semibold mb-2">Couleurs:</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-12 h-12 rounded border-2 transition-all",
                selectedColor === color
                  ? "border-primary ring-2 ring-primary ring-offset-2 scale-110"
                  : "border-gray-300 hover:border-primary hover:scale-105"
              )}
              style={{
                backgroundColor: getColorHex(color),
                borderColor: selectedColor === color ? 'hsl(var(--primary))' : undefined
              }}
              title={color}
            />
          ))}
        </div>
        {selectedColor && (
          <p className="text-sm text-muted-foreground mt-2">Selected: {selectedColor}</p>
        )}
      </div>

      {/* Price Display */}
      <div className="flex items-center gap-3">
        <span className="text-lg text-muted-foreground line-through">
          {originalPrice.toFixed(1)}DT
        </span>
        <span className="text-2xl font-bold">
          {discountedPrice.toFixed(1)}DT
        </span>
      </div>

      {/* Customer Information */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Customer information</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="The address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="text"
            placeholder="Name and surname"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold">Quantity:</label>
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 text-lg font-medium">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        variant="default"
        className="w-full text-white"
        disabled={!selectedSize || !selectedColor || isSubmitting || !product.inStock}
      >
        {isSubmitting ? 'Placing Order...' : 'Order Now'}
      </Button>
    </form>
  );
};

export default ProductOrderForm;

