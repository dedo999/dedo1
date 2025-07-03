import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Ruler, Lightbulb, Zap } from 'lucide-react';
import { BarbershopSVG } from '@/components/barbershop-svg';

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
    name: "Layout 3 Cadeiras Linear",
    description: "3 cadeiras com LED no teto - estilo preferido",
    items: [
      { id: 'chair1', name: 'Cadeira 1', width: 0.9, height: 0.9, x: 0.5, y: 1.8, color: '#2C1810', description: 'Cadeira de barbeiro profissional' },
      { id: 'chair2', name: 'Cadeira 2', width: 0.9, height: 0.9, x: 1.8, y: 1.8, color: '#2C1810', description: 'Cadeira de barbeiro profissional' },
      { id: 'chair3', name: 'Cadeira 3', width: 0.9, height: 0.9, x: 3.1, y: 1.8, color: '#2C1810', description: 'Cadeira de barbeiro profissional' },
      { id: 'mirror1', name: 'Espelho 1', width: 0.7, height: 0.05, x: 0.6, y: 0.1, color: '#C0C0C0', description: 'Espelho com LED integrado' },
      { id: 'mirror2', name: 'Espelho 2', width: 0.7, height: 0.05, x: 1.9, y: 0.1, color: '#C0C0C0', description: 'Espelho com LED integrado' },
      { id: 'mirror3', name: 'Espelho 3', width: 0.7, height: 0.05, x: 3.2, y: 0.1, color: '#C0C0C0', description: 'Espelho com LED integrado' },
      { id: 'led1', name: 'LED Teto 1', width: 1.2, height: 0.8, x: 0.4, y: 1.0, color: '#FFFFE0', description: 'Painel LED no teto' },
      { id: 'led2', name: 'LED Teto 2', width: 1.2, height: 0.8, x: 1.7, y: 1.0, color: '#FFFFE0', description: 'Painel LED no teto' },
      { id: 'led3', name: 'LED Teto 3', width: 1.2, height: 0.8, x: 3.0, y: 1.0, color: '#FFFFE0', description: 'Painel LED no teto' },
      { id: 'counter1', name: 'Bancada 1', width: 0.4, height: 0.25, x: 0.5, y: 0.4, color: '#654321', description: 'Bancada com ferramentas' },
      { id: 'counter2', name: 'Bancada 2', width: 0.4, height: 0.25, x: 1.8, y: 0.4, color: '#654321', description: 'Bancada com ferramentas' },
      { id: 'counter3', name: 'Bancada 3', width: 0.4, height: 0.25, x: 3.1, y: 0.4, color: '#654321', description: 'Bancada com ferramentas' },
      { id: 'reception', name: 'Recepção', width: 1.0, height: 0.4, x: 4.8, y: 0.2, color: '#8B4513', description: 'Balcão de entrada' },
      { id: 'waiting', name: 'Sofá Espera', width: 1.5, height: 0.6, x: 4.3, y: 1.2, color: '#8B0000', description: 'Sofá confortável' },
      { id: 'wash', name: 'Lavatório', width: 0.7, height: 0.5, x: 5.1, y: 2.7, color: '#4682B4', description: 'Estação de lavagem' },
      { id: 'storage', name: 'Armário', width: 0.3, height: 2.2, x: 0.1, y: 0.3, color: '#696969', description: 'Armário vertical' }
    ]
  },
  lshaped: {
    name: "Layout 3 Cadeiras em L",
    description: "Configuração em L com 3 cadeiras e LED no teto",
    items: [
      { id: 'chair1', name: 'Cadeira 1', width: 0.9, height: 0.9, x: 0.8, y: 1.5, color: '#2C1810', description: 'Cadeira lateral esquerda' },
      { id: 'chair2', name: 'Cadeira 2', width: 0.9, height: 0.9, x: 2.2, y: 1.5, color: '#2C1810', description: 'Cadeira central' },
      { id: 'chair3', name: 'Cadeira 3', width: 0.9, height: 0.9, x: 4.2, y: 2.3, color: '#2C1810', description: 'Cadeira lateral direita' },
      { id: 'mirror1', name: 'Espelho 1', width: 0.7, height: 0.05, x: 0.9, y: 0.1, color: '#C0C0C0', description: 'Espelho com LED' },
      { id: 'mirror2', name: 'Espelho 2', width: 0.7, height: 0.05, x: 2.3, y: 0.1, color: '#C0C0C0', description: 'Espelho central' },
      { id: 'mirror3', name: 'Espelho 3', width: 0.7, height: 0.05, x: 3.8, y: 1.4, color: '#C0C0C0', description: 'Espelho lateral' },
      { id: 'led1', name: 'LED Teto 1', width: 1.5, height: 1.0, x: 0.5, y: 0.8, color: '#FFFFE0', description: 'LED área principal' },
      { id: 'led2', name: 'LED Teto 2', width: 1.0, height: 1.0, x: 2.0, y: 0.8, color: '#FFFFE0', description: 'LED área central' },
      { id: 'led3', name: 'LED Teto 3', width: 1.2, height: 0.8, x: 3.8, y: 1.8, color: '#FFFFE0', description: 'LED área lateral' },
      { id: 'reception', name: 'Recepção', width: 0.8, height: 0.4, x: 5.0, y: 0.2, color: '#8B4513', description: 'Balcão entrada' },
      { id: 'waiting', name: 'Sofá Espera', width: 1.0, height: 0.6, x: 4.8, y: 1.0, color: '#8B0000', description: 'Área de espera' },
      { id: 'wash', name: 'Lavatório', width: 0.7, height: 0.6, x: 0.2, y: 2.6, color: '#4682B4', description: 'Estação lavagem' },
      { id: 'storage', name: 'Armário', width: 0.3, height: 1.8, x: 3.4, y: 0.3, color: '#696969', description: 'Armário produtos' }
    ]
  },
  modern: {
    name: "Layout 3 Cadeiras Premium",
    description: "Design moderno com 3 cadeiras e LED no teto",
    items: [
      { id: 'chair1', name: 'Cadeira 1', width: 0.9, height: 0.9, x: 0.7, y: 2.0, color: '#2C1810', description: 'Cadeira premium com recline' },
      { id: 'chair2', name: 'Cadeira 2', width: 0.9, height: 0.9, x: 2.5, y: 1.3, color: '#2C1810', description: 'Cadeira central premium' },
      { id: 'chair3', name: 'Cadeira 3', width: 0.9, height: 0.9, x: 4.3, y: 2.0, color: '#2C1810', description: 'Cadeira premium direita' },
      { id: 'mirror1', name: 'Espelho 1', width: 0.7, height: 0.05, x: 0.8, y: 0.8, color: '#C0C0C0', description: 'Espelho iluminado' },
      { id: 'mirror2', name: 'Espelho 2', width: 0.7, height: 0.05, x: 2.6, y: 0.2, color: '#C0C0C0', description: 'Espelho central' },
      { id: 'mirror3', name: 'Espelho 3', width: 0.7, height: 0.05, x: 4.4, y: 0.8, color: '#C0C0C0', description: 'Espelho direito' },
      { id: 'led1', name: 'LED Premium 1', width: 1.5, height: 1.2, x: 0.3, y: 1.5, color: '#FFFFE0', description: 'LED regulável zona 1' },
      { id: 'led2', name: 'LED Premium 2', width: 1.5, height: 1.2, x: 2.0, y: 0.8, color: '#FFFFE0', description: 'LED regulável zona 2' },
      { id: 'led3', name: 'LED Premium 3', width: 1.5, height: 1.2, x: 3.8, y: 1.5, color: '#FFFFE0', description: 'LED regulável zona 3' },
      { id: 'station1', name: 'Estação 1', width: 0.5, height: 0.3, x: 0.6, y: 1.0, color: '#654321', description: 'Estação de trabalho' },
      { id: 'station2', name: 'Estação 2', width: 0.5, height: 0.3, x: 2.4, y: 0.5, color: '#654321', description: 'Estação central' },
      { id: 'station3', name: 'Estação 3', width: 0.5, height: 0.3, x: 4.2, y: 1.0, color: '#654321', description: 'Estação direita' },
      { id: 'reception', name: 'Recepção VIP', width: 1.2, height: 0.4, x: 1.5, y: 3.0, color: '#8B4513', description: 'Balcão moderno' },
      { id: 'waiting', name: 'Lounge', width: 1.0, height: 0.5, x: 3.2, y: 3.0, color: '#8B0000', description: 'Área lounge' },
      { id: 'wash', name: 'SPA Wash', width: 0.8, height: 0.6, x: 5.0, y: 0.3, color: '#4682B4', description: 'Estação SPA' }
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

          {/* SVG Visualization */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  {currentLayout.name}
                  <Badge variant="secondary">Escala: 1:100</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Generated SVG Layout */}
                <BarbershopSVG layout={selectedLayout} width={600} height={350} />

                {/* LED Lighting Specifications */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Sistema LED no Teto - Especificações
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                    <div>
                      <p className="font-medium">Painéis LED Recomendados:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• 3 painéis de 60x60cm ou 120x30cm</li>
                        <li>• Temperatura: 4000K-5000K (luz branca)</li>
                        <li>• Potência: 36W-48W por painel</li>
                        <li>• Dimmer regulável para ajuste</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Instalação:</p>
                      <ul className="mt-1 space-y-1">
                        <li>• Altura do teto: 3,5m</li>
                        <li>• Posicionamento sobre cada cadeira</li>
                        <li>• Evitar sombras no rosto dos clientes</li>
                        <li>• Controle individual por zona</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tips for Goiânia */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Dicas para Goiânia</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Ar-condicionado split de 18.000 BTUs mínimo</li>
                    <li>• Iluminação LED fria para trabalho de precisão</li>
                    <li>• Piso porcelanato antiderrapante</li>
                    <li>• Ventilação cruzada obrigatória</li>
                    <li>• Entrada acessível (1,20m largura mínima)</li>
                    <li>• Tomadas com aterramento para equipamentos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Equipment List and Cost Estimation */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Equipamentos - {currentLayout.name}</CardTitle>
              <CardDescription>Equipamentos necessários para implementar este layout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentLayout.items.filter(item => !item.name.includes('Piso')).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.width}m × {item.height}m</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Estimativa de Custos - Goiânia
              </CardTitle>
              <CardDescription>Valores aproximados para montagem completa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-green-700 mb-2">Equipamentos Principais</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>3 Cadeiras de barbeiro profissionais</span>
                      <span className="font-medium">R$ 4.500 - 9.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Espelhos com moldura e LED</span>
                      <span className="font-medium">R$ 900 - 1.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sistema LED no teto (3 painéis)</span>
                      <span className="font-medium">R$ 800 - 1.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bancadas e armazenamento</span>
                      <span className="font-medium">R$ 1.200 - 2.000</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-blue-700 mb-2">Infraestrutura</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Piso porcelanato + instalação</span>
                      <span className="font-medium">R$ 2.500 - 4.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ar-condicionado + instalação</span>
                      <span className="font-medium">R$ 2.000 - 3.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Instalação elétrica completa</span>
                      <span className="font-medium">R$ 1.500 - 2.500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lavatório + instalação hidráulica</span>
                      <span className="font-medium">R$ 1.200 - 2.000</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Estimado:</span>
                    <span className="text-green-600">R$ 14.600 - 25.700</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    *Valores podem variar conforme fornecedores em Goiânia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}