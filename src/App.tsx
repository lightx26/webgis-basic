import React, { useState } from 'react';
import MapComponent from './components/Map';
import LayerControl from './components/LayerControl';
import Search from './components/Search';

const App: React.FC = () => {
  const [layers, setLayers] = useState([
    {
      id: 'city_boundaries',
      name: 'City Boundaries',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:city_boundaries&outputFormat=application/json',
      visible: true,
    },
    {
      id: 'district_boundaries',
      name: 'District Boundaries',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:district_boundaries&outputFormat=application/json',
      visible: true,
    },
    {
      id: 'ward_boundaries',
      name: 'Ward Boundaries',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:ward_boundaries&outputFormat=application/json',
      visible: false,
    },
    {
      id: 'water',
      name: 'Water',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:water&outputFormat=application/json',
      visible: false,
    },
    {
      id: 'waterways',
      name: 'Waterways',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:waterways&outputFormat=application/json',
      visible: true,
    },
    {
      id: 'bridges',
      name: 'Bridges',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:bridges&outputFormat=application/json',
      visible: true,
    },
    {
      id: 'roads',
      name: 'Roads',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:roads&outputFormat=application/json',
      visible: false,
    },
    {
      id: 'university',
      name: 'University',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:university&outputFormat=application/json',
      visible: true,
    },
    {
      id: 'airports',
      name: 'Airports',
      url: 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=danama3:airports&outputFormat=application/json',
      visible: true,
    },
  ]);

  const handleToggleLayer = (id: string) => {
    setLayers(layers.map(layer => {
      return layer.id === id ? { ...layer, visible: !layer.visible } : layer
    }
    ));
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query);
    // You would typically make an API call to your backend here
  };

  return (
    <div className="w-screen h-screen">
      <MapComponent layers={layers} />
      <LayerControl layers={layers} onToggleLayer={handleToggleLayer} />
      <Search onSearch={handleSearch} />
    </div>
  );
};

export default App;