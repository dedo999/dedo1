interface BarbershopSVGProps {
  layout: 'linear' | 'lshaped' | 'modern';
  width?: number;
  height?: number;
}

export function BarbershopSVG({ layout, width = 600, height = 350 }: BarbershopSVGProps) {
  const scale = 100; // pixels per meter
  const roomWidth = 6 * scale;
  const roomHeight = 3.5 * scale;

  const layouts = {
    linear: {
      name: "Layout Linear - 3 Cadeiras",
      chairs: [
        { x: 0.5, y: 1.8, id: 1 },
        { x: 1.8, y: 1.8, id: 2 },
        { x: 3.1, y: 1.8, id: 3 }
      ],
      leds: [
        { x: 0.4, y: 1.0, width: 1.2, height: 0.8 },
        { x: 1.7, y: 1.0, width: 1.2, height: 0.8 },
        { x: 3.0, y: 1.0, width: 1.2, height: 0.8 }
      ],
      mirrors: [
        { x: 0.6, y: 0.1, width: 0.7 },
        { x: 1.9, y: 0.1, width: 0.7 },
        { x: 3.2, y: 0.1, width: 0.7 }
      ],
      extras: [
        { type: 'reception', x: 4.8, y: 0.2, width: 1.0, height: 0.4 },
        { type: 'sofa', x: 4.3, y: 1.2, width: 1.5, height: 0.6 },
        { type: 'wash', x: 5.1, y: 2.7, width: 0.7, height: 0.5 }
      ]
    },
    lshaped: {
      name: "Layout em L - 3 Cadeiras",
      chairs: [
        { x: 0.8, y: 1.5, id: 1 },
        { x: 2.2, y: 1.5, id: 2 },
        { x: 4.2, y: 2.3, id: 3 }
      ],
      leds: [
        { x: 0.5, y: 0.8, width: 1.5, height: 1.0 },
        { x: 2.0, y: 0.8, width: 1.0, height: 1.0 },
        { x: 3.8, y: 1.8, width: 1.2, height: 0.8 }
      ],
      mirrors: [
        { x: 0.9, y: 0.1, width: 0.7 },
        { x: 2.3, y: 0.1, width: 0.7 },
        { x: 3.8, y: 1.4, width: 0.7 }
      ],
      extras: [
        { type: 'reception', x: 5.0, y: 0.2, width: 0.8, height: 0.4 },
        { type: 'sofa', x: 4.8, y: 1.0, width: 1.0, height: 0.6 },
        { type: 'wash', x: 0.2, y: 2.6, width: 0.7, height: 0.6 }
      ]
    },
    modern: {
      name: "Layout Moderno - 3 Cadeiras",
      chairs: [
        { x: 0.7, y: 2.0, id: 1 },
        { x: 2.5, y: 1.3, id: 2 },
        { x: 4.3, y: 2.0, id: 3 }
      ],
      leds: [
        { x: 0.3, y: 1.5, width: 1.5, height: 1.2 },
        { x: 2.0, y: 0.8, width: 1.5, height: 1.2 },
        { x: 3.8, y: 1.5, width: 1.5, height: 1.2 }
      ],
      mirrors: [
        { x: 0.8, y: 0.8, width: 0.7 },
        { x: 2.6, y: 0.2, width: 0.7 },
        { x: 4.4, y: 0.8, width: 0.7 }
      ],
      extras: [
        { type: 'reception', x: 1.5, y: 3.0, width: 1.2, height: 0.4 },
        { type: 'sofa', x: 3.2, y: 3.0, width: 1.0, height: 0.5 },
        { type: 'wash', x: 5.0, y: 0.3, width: 0.8, height: 0.6 }
      ]
    }
  };

  const currentLayout = layouts[layout];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
        {currentLayout.name}
      </h3>
      
      <svg width={width} height={height} viewBox={`0 0 ${roomWidth} ${roomHeight}`} className="border-2 border-gray-800 bg-gray-50">
        {/* Room outline */}
        <rect 
          x="0" 
          y="0" 
          width={roomWidth} 
          height={roomHeight} 
          fill="#f8f9fa" 
          stroke="#343a40" 
          strokeWidth="4"
        />
        
        {/* Grid lines */}
        {Array.from({ length: 7 }, (_, i) => (
          <line 
            key={`v-${i}`}
            x1={i * scale} 
            y1="0" 
            x2={i * scale} 
            y2={roomHeight} 
            stroke="#dee2e6" 
            strokeWidth="1" 
            opacity="0.3"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line 
            key={`h-${i}`}
            x1="0" 
            y1={i * scale} 
            x2={roomWidth} 
            y2={i * scale} 
            stroke="#dee2e6" 
            strokeWidth="1" 
            opacity="0.3"
          />
        ))}

        {/* LED Panels */}
        {currentLayout.leds.map((led, index) => (
          <g key={`led-${index}`}>
            <rect
              x={led.x * scale}
              y={led.y * scale}
              width={led.width * scale}
              height={led.height * scale}
              fill="#ffffe0"
              stroke="#ffd700"
              strokeWidth="3"
              rx="8"
              opacity="0.8"
            />
            <circle
              cx={led.x * scale + (led.width * scale) / 2}
              cy={led.y * scale + (led.height * scale) / 2}
              r="4"
              fill="#ffd700"
            />
            <text
              x={led.x * scale + (led.width * scale) / 2}
              y={led.y * scale + (led.height * scale) / 2 + 20}
              textAnchor="middle"
              fontSize="10"
              fill="#b8860b"
              fontWeight="bold"
            >
              LED {index + 1}
            </text>
          </g>
        ))}

        {/* Barber Chairs */}
        {currentLayout.chairs.map((chair) => (
          <g key={`chair-${chair.id}`}>
            <circle
              cx={chair.x * scale + 45}
              cy={chair.y * scale + 45}
              r="40"
              fill="#2c1810"
              stroke="#8b4513"
              strokeWidth="3"
            />
            <circle
              cx={chair.x * scale + 45}
              cy={chair.y * scale + 35}
              r="25"
              fill="#4a2c17"
            />
            <text
              x={chair.x * scale + 45}
              y={chair.y * scale + 45}
              textAnchor="middle"
              fontSize="12"
              fill="white"
              fontWeight="bold"
            >
              {chair.id}
            </text>
          </g>
        ))}

        {/* Mirrors */}
        {currentLayout.mirrors.map((mirror, index) => (
          <rect
            key={`mirror-${index}`}
            x={mirror.x * scale}
            y={mirror.y * scale}
            width={mirror.width * scale}
            height="5"
            fill="#c0c0c0"
            stroke="#silver"
            strokeWidth="2"
            rx="2"
          />
        ))}

        {/* Extra furniture */}
        {currentLayout.extras.map((item, index) => (
          <g key={`extra-${index}`}>
            <rect
              x={item.x * scale}
              y={item.y * scale}
              width={item.width * scale}
              height={item.height * scale}
              fill={
                item.type === 'reception' ? '#8b4513' :
                item.type === 'sofa' ? '#8b0000' : '#4682b4'
              }
              stroke="#333"
              strokeWidth="2"
              rx="4"
              opacity="0.8"
            />
            <text
              x={item.x * scale + (item.width * scale) / 2}
              y={item.y * scale + (item.height * scale) / 2}
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
            >
              {item.type === 'reception' ? 'REC' : 
               item.type === 'sofa' ? 'SOFÁ' : 'LAVA'}
            </text>
          </g>
        ))}

        {/* Measurements */}
        <text x={roomWidth / 2} y={roomHeight + 20} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">
          6,00m
        </text>
        <text x="-15" y={roomHeight / 2} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" transform={`rotate(-90, -15, ${roomHeight / 2})`}>
          3,50m
        </text>
      </svg>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Equipamentos:</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-200 border border-yellow-500 rounded mr-2"></div>
              <span>LED no Teto</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-800 rounded-full mr-2"></div>
              <span>Cadeiras (3)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-400 mr-2"></div>
              <span>Espelhos</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Áreas:</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-800 mr-2"></div>
              <span>Recepção</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-800 mr-2"></div>
              <span>Espera</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 mr-2"></div>
              <span>Lavatório</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}