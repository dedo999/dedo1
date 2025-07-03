import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LayoutItem {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  description: string;
}

const layouts = {
  linear: {
    name: "Layout Linear",
    description: "Configuração tradicional com cadeiras alinhadas",
    items: [
      { id: 'chair1', name: 'Cadeira 1', width: 1.2, height: 1.2, x: 0.5, y: 1.5, color: '#8B4513', description: 'Cadeira de barbeiro profissional' },
      { id: 'chair2', name: 'Cadeira 2', width: 1.2, height: 1.2, x: 2.2, y: 1.5, color: '#8B4513', description: 'Cadeira de barbeiro profissional' },
      { id: 'mirror1', name: 'Espelho 1', width: 1.0, height: 0.1, x: 0.6, y: 0.2, color: '#E6E6FA', description: 'Espelho grande com iluminação' },
      { id: 'mirror2', name: 'Espelho 2', width: 1.0, height: 0.1, x: 2.3, y: 0.2, color: '#E6E6FA', description: 'Espelho grande com iluminação' },
      { id: 'reception', name: 'Recepção', width: 1.0, height: 0.6, x: 4.5, y: 0.3, color: '#654321', description: 'Mesa de recepção compacta' },
      { id: 'waiting', name: 'Espera', width: 1.5, height: 0.8, x: 4.2, y: 1.5, color: '#2F4F4F', description: '3-4 cadeiras de espera' },
      { id: 'wash', name: 'Lavatório', width: 1.0, height: 0.8, x: 4.8, y: 2.7, color: '#4682B4', description: 'Estação de lavagem' },
      { id: 'storage', name: 'Armário', width: 0.4, height: 3.0, x: 0.1, y: 0.3, color: '#696969', description: 'Armazenamento vertical' }
    ]
  },
  lshaped: {
    name: "Layout em L",
    description: "Configuração angular para melhor fluxo",
    items: [
      { id: 'chair1', name: 'Cadeira 1', width: 1.2, height: 1.2, x: 1.0, y: 1.0, color: '#8B4513', description: 'Cadeira principal' },
      { id: 'chair2', name: 'Cadeira 2', width: 1.2, height: 1.2, x: 3.5, y: 2.0, color: '#8B4513', description: 'Cadeira secundária' },
      { id: 'mirror1', name: 'Espelho 1', width: 1.0, height: 0.1, x: 1.1, y: 0.2, color: '#E6E6FA', description: 'Espelho com LED' },
      { id: 'mirror2', name: 'Espelho 2', width: 1.0, height: 0.1, x: 3.6, y: 1.2, color: '#E6E6FA', description: 'Espelho lateral' },
      { id: 'reception', name: 'Recepção', width: 0.8, height: 0.5, x: 5.0, y: 0.2, color: '#654321', description: 'Balcão de entrada' },
      { id: 'waiting', name: 'Espera', width: 1.2, height: 1.5, x: 4.5, y: 1.0, color: '#2F4F4F', description: 'Área de espera' },
      { id: 'wash', name: 'Lavatório', width: 1.0, height: 0.8, x: 0.2, y: 2.5, color: '#4682B4', description: 'Pia para lavagem' },
      { id: 'products', name: 'Produtos', width: 0.3, height: 1.5, x: 2.5, y: 0.3, color: '#696969', description: 'Prateleira de produtos' }
    ]
  },
  modern: {
    name: "Layout Moderno",
    description: "Design contemporâneo com ilha central",
    items: [
      { id: 'island', name: 'Ilha Central', width: 2.0, height: 1.5, x: 2.0, y: 1.5, color: '#8B4513', description: 'Estação dupla central' },
      { id: 'chair1', name: 'Cadeira 1', width: 1.0, height: 1.0, x: 2.2, y: 1.2, color: '#A0522D', description: 'Cadeira premium' },
      { id: 'chair2', name: 'Cadeira 2', width: 1.0, height: 1.0, x: 2.8, y: 1.8, color: '#A0522D', description: 'Cadeira premium' },
      { id: 'reception', name: 'Recepção', width: 1.5, height: 0.5, x: 4.2, y: 0.3, color: '#654321', description: 'Recepção moderna' },
      { id: 'waiting', name: 'Espera VIP', width: 1.8, height: 0.8, x: 0.2, y: 0.5, color: '#2F4F4F', description: 'Sofá de espera' },
      { id: 'wash', name: 'Estação SPA', width: 1.2, height: 1.0, x: 4.5, y: 2.3, color: '#4682B4', description: 'Lavagem premium' },
      { id: 'retail', name: 'Vitrine', width: 0.4, height: 1.2, x: 0.3, y: 1.8, color: '#696969', description: 'Exposição de produtos' },
      { id: 'tools', name: 'Ferramentas', width: 0.3, height: 0.8, x: 5.5, y: 1.2, color: '#708090', description: 'Organizador de tools' }
    ]
  }
};

export default function BarbershopDesigner() {
  const [selectedLayout, setSelectedLayout] = useState<keyof typeof layouts>('linear');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const currentLayout = layouts[selectedLayout];
  const scale = 60; // pixels per meter

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Designer de Barbearia - Goiânia
          </h1>
          <p className="text-lg text-gray-600">
            Sala: 3,5m (altura) × 6,0m (comprimento) - Planejamento profissional
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Layout Options */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Opções de Layout</h2>
            {Object.entries(layouts).map(([key, layout]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedLayout === key ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onClick={() => setSelectedLayout(key as keyof typeof layouts)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{layout.name}</CardTitle>
                  <CardDescription>{layout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>• {layout.items.filter(item => item.name.includes('Cadeira')).length} cadeiras de barbeiro</p>
                    <p>• Área de espera otimizada</p>
                    <p>• Lavatório incluso</p>
                    <p>• Armazenamento inteligente</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 3D Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  {currentLayout.name}
                  <Badge variant="secondary">Escala: 1:100</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Room Container */}
                <div className="relative border-4 border-gray-800 bg-gray-100 mx-auto" 
                     style={{ width: 6 * scale, height: 3.5 * scale }}>
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={`v-${i}`} className="absolute bg-gray-400" 
                           style={{ left: i * scale, width: 1, height: '100%' }} />
                    ))}
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={`h-${i}`} className="absolute bg-gray-400" 
                           style={{ top: i * scale, height: 1, width: '100%' }} />
                    ))}
                  </div>

                  {/* Layout Items */}
                  {currentLayout.items.map((item) => (
                    <div
                      key={item.id}
                      className={`absolute border-2 border-gray-600 rounded cursor-pointer transition-all hover:scale-105 ${
                        selectedItem === item.id ? 'ring-2 ring-amber-500 z-10' : ''
                      }`}
                      style={{
                        left: item.x * scale,
                        top: item.y * scale,
                        width: item.width * scale,
                        height: item.height * scale,
                        backgroundColor: item.color,
                        opacity: 0.8
                      }}
                      onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs text-center p-1">
                        {item.name}
                      </div>
                    </div>
                  ))}

                  {/* Measurements */}
                  <div className="absolute -bottom-8 left-0 right-0 text-center text-sm font-semibold text-gray-700">
                    6,00m
                  </div>
                  <div className="absolute -left-8 top-0 bottom-0 flex items-center">
                    <div className="transform -rotate-90 text-sm font-semibold text-gray-700">
                      3,50m
                    </div>
                  </div>
                </div>

                {/* Item Details */}
                {selectedItem && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                    {(() => {
                      const item = currentLayout.items.find(i => i.id === selectedItem);
                      return item ? (
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            <p>Dimensões: {item.width}m × {item.height}m</p>
                            <p>Posição: {item.x}m, {item.y}m</p>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                {/* Tips for Goiânia */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Dicas para Goiânia</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Considere ar-condicionado potente para o clima local</li>
                    <li>• Iluminação LED fria para trabalho de precisão</li>
                    <li>• Piso antiderrapante para segurança</li>
                    <li>• Ventilação adequada obrigatória</li>
                    <li>• Espaço para cadeira de rodas (acessibilidade)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Equipment List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Lista de Equipamentos - {currentLayout.name}</CardTitle>
            <CardDescription>Equipamentos necessários para implementar este layout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentLayout.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.width}m × {item.height}m</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}