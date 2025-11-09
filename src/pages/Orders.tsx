import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, Package, Clock, CheckCircle } from 'lucide-react';

export default function Orders() {
  const { user, isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Buyurtmalar</h1>
            <p>Buyurtmalarni ko'rish uchun tizimga kiring</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const mockOrders = [
    {
      id: '1',
      date: '2024-01-15',
      status: 'delivered',
      total: '250,000 UZS',
      items: 2
    },
    {
      id: '2', 
      date: '2024-01-10',
      status: 'processing',
      total: '180,000 UZS',
      items: 1
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Yetkazildi';
      case 'processing': return 'Jarayonda';
      default: return 'Noma\'lum';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Mening buyurtmalarim</h1>
          </div>

          {mockOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Hali buyurtmalar yo'q</h2>
              <p className="text-muted-foreground">Birinchi buyurtmangizni bering!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Buyurtma #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">{order.items} ta mahsulot</p>
                      <p className="font-semibold">{order.total}</p>
                    </div>
                    <button className="text-primary hover:underline text-sm">
                      Batafsil ko'rish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}