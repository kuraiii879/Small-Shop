import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, Order } from '../../api/orders';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import OrderInvoice from './OrderInvoice';

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
      if (selectedOrder?._id === orderId) {
        const updated = await getOrders();
        const updatedOrder = updated.find(o => o._id === orderId);
        if (updatedOrder) setSelectedOrder(updatedOrder);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update order status');
    }
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

  if (selectedOrder) {
    return (
      <OrderInvoice
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
        onStatusUpdate={handleStatusUpdate}
      />
    );
  }

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-destructive text-center py-12">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-muted-foreground">{orders.length} total orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No orders yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">Order #{order._id.slice(-6)}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{order.totalAmount.toFixed(2)}DT</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{order.customerPhone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right max-w-md">{order.customerAddress}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Invoice
                  </Button>
                  {order.status === 'pending' && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusUpdate(order._id, 'processing')}
                      >
                        Mark Processing
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleStatusUpdate(order._id, 'completed')}
                    >
                      Mark Completed
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;

