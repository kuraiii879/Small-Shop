import { Order } from '../../api/orders';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Clock, Printer } from 'lucide-react';

interface OrderInvoiceProps {
  order: Order;
  onBack: () => void;
  onStatusUpdate: (orderId: string, status: Order['status']) => Promise<void>;
}

const OrderInvoice = ({ order, onBack, onStatusUpdate }: OrderInvoiceProps) => {
  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'outline',
      processing: 'default',
      completed: 'default',
      cancelled: 'destructive'
    };

    const icons = {
      pending: <Clock className="h-3 w-3 mr-1" />,
      processing: <Clock className="h-3 w-3 mr-1" />,
      completed: <CheckCircle className="h-3 w-3 mr-1" />,
      cancelled: <XCircle className="h-3 w-3 mr-1" />
    };

    return (
      <Badge variant={variants[status]}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
          {order.status === 'pending' && (
            <>
              <Button onClick={() => onStatusUpdate(order._id, 'processing')}>
                Mark Processing
              </Button>
              <Button variant="destructive" onClick={() => onStatusUpdate(order._id, 'cancelled')}>
                Cancel Order
              </Button>
            </>
          )}
          {order.status === 'processing' && (
            <Button onClick={() => onStatusUpdate(order._id, 'completed')}>
              Mark Completed
            </Button>
          )}
        </div>
      </div>

      <Card className="print:shadow-none">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">Order Invoice</CardTitle>
              <p className="text-muted-foreground">Order #{order._id.slice(-8)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Address:</span>
                <p className="mt-1">{order.customerAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Product</th>
                    <th className="text-left p-3 font-semibold">Size</th>
                    <th className="text-left p-3 font-semibold">Color</th>
                    <th className="text-right p-3 font-semibold">Quantity</th>
                    <th className="text-right p-3 font-semibold">Price</th>
                    <th className="text-right p-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{item.productName}</td>
                      <td className="p-3">{item.size || 'N/A'}</td>
                      <td className="p-3">{item.color || 'N/A'}</td>
                      <td className="p-3 text-right">{item.quantity}</td>
                      <td className="p-3 text-right">{item.price.toFixed(2)}DT</td>
                      <td className="p-3 text-right font-medium">
                        {(item.price * item.quantity).toFixed(2)}DT
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>
                    {(order.totalAmount - order.deliveryFee).toFixed(2)}DT
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee:</span>
                  <span>{order.deliveryFee.toFixed(2)}DT</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{order.totalAmount.toFixed(2)}DT</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderInvoice;

