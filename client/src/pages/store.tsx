import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  sizes?: string[];
  colors?: string[];
  imageUrl: string;
  inStock: number;
  isActive: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Kaizen Burgos Official Products
const kaizenProducts: Product[] = [
  {
    id: 1,
    name: 'Sudadera Kaizen Negra Premium',
    description: 'Sudadera oficial con capucha Kaizen Burgos. Algodón premium 400gsm con logo bordado. Perfecta para entrenamientos y uso casual.',
    price: '55.00',
    category: 'clothing',
    subcategory: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro'],
    imageUrl: '/sudadera-kaizen.jpg',
    inStock: 20,
    isActive: true
  },
  {
    id: 2,
    name: 'Camiseta Kaizen Negra Oficial',
    description: 'Camiseta negra oficial de Kaizen Burgos. Tejido técnico transpirable ideal para entrenamientos y uso diario.',
    price: '35.00',
    category: 'clothing',
    subcategory: 't-shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro'],
    imageUrl: '/camiseta-negra.jpg',
    inStock: 25,
    isActive: true
  }
];

export default function Store() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product, size?: string, color?: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      
      if (existingItem) {
        return prev.map(item =>
          item === existingItem 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });

    toast({
      title: "Producto añadido",
      description: `${product.name} añadido al carrito`,
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    
    setCart(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.product.price) * item.quantity), 0);
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

    const handleAddToCart = () => {
      addToCart(product, selectedSize, selectedColor);
    };

    return (
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
        <CardHeader className="p-0">
          {/* Product image */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/400/400';
              }}
            />
            {/* Stock indicator */}
            <div className="absolute bottom-3 right-3">
              <div className={`w-3 h-3 rounded-full ${product.inStock > 10 ? 'bg-green-500' : 
                product.inStock > 5 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {/* Product info */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          </div>
          
          {/* Price and stock */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-red-600">€{product.price}</span>
            <Badge variant={product.inStock > 0 ? "default" : "destructive"} className="text-xs">
              {product.inStock > 0 ? `${product.inStock} en stock` : 'Agotado'}
            </Badge>
          </div>

          {/* Size selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="text-sm font-bold mb-2 block text-gray-700">Talla:</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full border-2 hover:border-red-300 focus:border-red-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Color selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="text-sm font-bold mb-2 block text-gray-700">Color:</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full border-2 hover:border-red-300 focus:border-red-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Add to cart button */}
          <Button 
            onClick={handleAddToCart}
            disabled={product.inStock === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400"
          >
            {product.inStock > 0 ? 'Añadir al Carrito' : 'Agotado'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            TIENDA OFICIAL <span className="text-kaizen-red">KAIZEN BURGOS</span>
          </h1>
          <p className="text-xl text-kaizen-gray max-w-2xl mx-auto">
            Productos oficiales de alta calidad para verdaderos luchadores
          </p>
        </div>

        {/* Cart button */}
        <div className="fixed top-20 right-6 z-50">
          <Button
            onClick={() => setShowCart(!showCart)}
            className="bg-kaizen-red hover:bg-kaizen-darker text-white rounded-full p-3 shadow-lg"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {kaizenProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Cart sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Tu Carrito</h2>
                <Button variant="ghost" onClick={() => setShowCart(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.product.name}</h3>
                          {item.selectedSize && <p className="text-xs text-gray-500">Talla: {item.selectedSize}</p>}
                          {item.selectedColor && <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>}
                          <p className="font-bold text-red-600">€{item.product.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(index, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(index, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-red-600">€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                      Finalizar Compra
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}