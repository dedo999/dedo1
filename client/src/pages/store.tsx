import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Star, Filter, Search, Plus, Minus, ArrowLeft, Heart, Share2, TrendingUp } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
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

const productCategories = [
  { id: 'clothing', name: 'Ropa Deportiva', icon: '👕' },
  { id: 'equipment', name: 'Equipamiento', icon: '🥊' },
  { id: 'kimono', name: 'Kimonos', icon: '🥋' }
];

// Premium products for the Kaizen store
const premiumProducts: Product[] = [
  {
    id: 1,
    name: 'Camiseta Kaizen Pro MMA',
    description: 'Camiseta oficial premium de Kaizen Burgos. Tejido técnico que mantiene la piel seca durante entrenamientos intensos.',
    price: '29.95',
    category: 'clothing',
    subcategory: 't-shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro/Rojo', 'Blanco/Negro', 'Rojo Kaizen'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 15,
    isActive: true
  },
  {
    id: 2,
    name: 'Shorts BJJ Elite Performance',
    description: 'Shorts profesionales con tecnología de secado rápido. Usados por atletas de competición. Diseño ergonómico para máxima movilidad.',
    price: '49.95',
    category: 'clothing',
    subcategory: 'shorts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro Mate', 'Azul Navy', 'Kaizen Red'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 22,
    isActive: true
  },
  {
    id: 3,
    name: 'Guantes Venum Impact 12oz',
    description: 'Guantes de boxeo premium con espuma de triple densidad. Cuero genuino y cierre de velcro reforzado. Homologados para competición.',
    price: '89.95',
    category: 'equipment',
    subcategory: 'gloves',
    sizes: ['10oz', '12oz', '14oz', '16oz'],
    colors: ['Negro/Oro', 'Rojo/Negro', 'Blanco/Negro'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 8,
    isActive: true
  },
  {
    id: 4,
    name: 'Kimono Gracie Barra Pro',
    description: 'Kimono oficial de competición A3 pre-encogido. Tejido 550gsm ultra resistente. Bordados oficiales incluidos.',
    price: '159.95',
    category: 'kimono',
    subcategory: 'gi',
    sizes: ['A1', 'A2', 'A3', 'A4', 'A5'],
    colors: ['Blanco', 'Azul Navy'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 5,
    isActive: true
  },
  {
    id: 5,
    name: 'Vendas Mexicanas Pro 4.5m',
    description: 'Vendas de algodón 100% con elastano. Máxima protección y soporte para muñecas. Pack de 2 unidades.',
    price: '18.95',
    category: 'equipment',
    subcategory: 'wraps',
    sizes: ['4.5m'],
    colors: ['Negro', 'Blanco', 'Rojo', 'Azul'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 35,
    isActive: true
  },
  {
    id: 6,
    name: 'Rashguard Kaizen Competition',
    description: 'Rashguard de compresión para grappling y MMA. Tejido antibacteriano con protección UV 50+. Sublimación de alta calidad.',
    price: '59.95',
    category: 'clothing',
    subcategory: 'rashguard',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro/Rojo Kaizen', 'Azul/Blanco', 'Camuflaje'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 12,
    isActive: true
  },
  {
    id: 7,
    name: 'Sudadera Kaizen Champions',
    description: 'Sudadera premium con capucha. Algodón orgánico 400gsm con logo bordado. Edición limitada campeones.',
    price: '79.95',
    category: 'clothing',
    subcategory: 'hoodie',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro/Oro', 'Gris Marengo', 'Rojo Kaizen'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 18,
    isActive: true
  },
  {
    id: 8,
    name: 'Protector Bucal Shock Doctor',
    description: 'Protector bucal profesional con gel de impacto. Ajuste personalizable. Respiración mejorada.',
    price: '24.95',
    category: 'equipment',
    subcategory: 'protection',
    sizes: ['Adulto', 'Junior'],
    colors: ['Transparente', 'Negro', 'Rojo'],
    imageUrl: '/api/placeholder/400/400',
    inStock: 25,
    isActive: true
  }
];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [showCart, setShowCart] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // In a real app, this would fetch from API
  const products = premiumProducts;

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.isActive;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-desc':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
      toast({
        title: "Producto añadido",
        description: `${product.name} añadido al carrito`,
      });
    };

    const isLowStock = product.inStock > 0 && product.inStock <= 5;

    return (
      <Card className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-red-200 bg-white overflow-hidden transform hover:-translate-y-2">
        <CardHeader className="p-0 relative">
          {/* Premium product badge */}
          <div className="absolute top-3 left-3 z-10">
            {product.price && parseFloat(product.price) > 80 && (
              <Badge className="bg-yellow-500 text-black font-bold">PREMIUM</Badge>
            )}
            {isLowStock && (
              <Badge variant="destructive" className="ml-2">¡ÚLTIMAS UNIDADES!</Badge>
            )}
          </div>
          
          {/* Product image placeholder with premium styling */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-red-50 to-gray-100">
              {product.category === 'clothing' ? '👕' :
               product.category === 'equipment' ? '🥊' : '🥋'}
            </div>
            {/* Stock indicator overlay */}
            <div className="absolute bottom-3 right-3">
              <div className={`w-3 h-3 rounded-full ${product.inStock > 10 ? 'bg-green-500' : 
                isLowStock ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {/* Product info */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          </div>
          
          {/* Price and stock */}
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-red-600">€{product.price}</span>
            <div className="text-right">
              <Badge variant={product.inStock > 0 ? "default" : "destructive"} className="text-xs">
                {product.inStock > 0 ? `${product.inStock} en stock` : 'Agotado'}
              </Badge>
            </div>
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
            disabled={product.inStock <= 0}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.inStock > 0 ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-red-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center text-white hover:text-red-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Gimnasio
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:text-red-400">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:text-red-400">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button 
                onClick={() => setShowCart(!showCart)}
                className="relative bg-red-600 hover:bg-red-700 text-white"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Carrito
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-yellow-500 text-black font-bold">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-red-500 mr-3" />
              <h1 className="text-5xl font-black bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                KAIZEN STORE
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Equipamiento premium para campeones. Calidad profesional usada por atletas de élite mundial.
            </p>
            
            {/* Strong CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all">
                🥊 EQUIPAMIENTO PRO
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all">
                👕 ROPA OFICIAL
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold rounded-full shadow-2xl transform hover:scale-105 transition-all">
                🥋 KIMONOS ELITE
              </Button>
            </div>

            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-black px-6 py-3 rounded-full inline-block font-bold text-lg shadow-xl">
              🔥 ENVÍO GRATIS en pedidos +€50 | Descuento 10% miembros Kaizen
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Buscar:</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoría:</label>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory('all')}
                    >
                      🛍️ Todos los productos
                    </Button>
                    {productCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon} {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="price">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Premium Shopping Cart */}
            {cart.length > 0 && (
              <Card className="mt-6 shadow-2xl border-2 border-red-200">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Carrito Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{item.product.name}</p>
                          {item.selectedSize && <p className="text-sm text-gray-600">Talla: {item.selectedSize}</p>}
                          {item.selectedColor && <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>}
                          <p className="text-sm font-bold text-red-600">€{item.product.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="icon" variant="ghost" onClick={() => updateQuantity(index, item.quantity - 1)}
                                  className="hover:bg-red-100">
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button size="icon" variant="ghost" onClick={() => updateQuantity(index, item.quantity + 1)}
                                  className="hover:bg-red-100">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Cart summary */}
                    <div className="pt-4 border-t-2 border-red-200">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal:</span>
                          <span>€{getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Envío:</span>
                          <span>{getTotalPrice() >= 50 ? 'GRATIS' : '€5.95'}</span>
                        </div>
                        <div className="flex justify-between text-lg font-black text-red-600">
                          <span>Total:</span>
                          <span>€{(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 5.95)).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {getTotalPrice() < 50 && (
                        <div className="bg-yellow-100 border border-yellow-400 rounded p-2 mt-3">
                          <p className="text-xs text-yellow-800">
                            Añade €{(50 - getTotalPrice()).toFixed(2)} más para envío gratis
                          </p>
                        </div>
                      )}
                      
                      <Button className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg shadow-xl">
                        🚀 FINALIZAR COMPRA
                      </Button>
                      
                      <p className="text-xs text-center text-gray-500 mt-2">
                        Pago seguro | Devoluciones 30 días
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando {sortedProducts.length} productos
                {selectedCategory !== 'all' && ` en ${productCategories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}