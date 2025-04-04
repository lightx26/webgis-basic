import React from 'react';

interface LayerControlProps {
  layers: {
    id: string;
    name: string;
    visible: boolean;
  }[];
  onToggleLayer: (id: string) => void;
}

const LayerControl: React.FC<LayerControlProps> = ({ layers, onToggleLayer }) => {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded shadow-lg z-10">
      <h2 className="font-bold mb-2">Layers</h2>
      <ul>
        {layers.map(layer => (
          <li key={layer.id} className="mb-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => onToggleLayer(layer.id)}
                className="mr-2"
              />
              {layer.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerControl;