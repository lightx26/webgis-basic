// src/components/MapView.tsx
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'

interface Layer {
  name: string
  displayName: string
  url: string
  active: boolean
}

const MapView = () => {
  const [layers] = useState<Layer[]>([
    {
      name: 'district_boundaries',
      displayName: 'Ranh giới quận',
      url: 'http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=district_boundaries&styles=&format=image/png&transparent=true',
      active: false
    },
    {
      name: 'ward_boundaries',
      displayName: 'Ranh giới phường',
      url: 'http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=ward_boundaries&styles=&format=image/png&transparent=true',
      active: false
    },
    {
      name: 'water',
      displayName: 'Sông nước',
      url: 'http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=water&styles=&format=image/png&transparent=true',
      active: false
    },
    {
      name: 'waterways',
      displayName: 'Đường thủy',
      url: 'http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=waterways&styles=&format=image/png&transparent=true',
      active: false
    },
    {
      name: 'roads',
      displayName: 'Đường giao thông',
      url: 'http://localhost:8080/geoserver/wms?service=WMS&version=1.1.0&request=GetMap&layers=roads&styles=&format=image/png&transparent=true',
      active: false
    }
  ])

  const [activeLayers, setActiveLayers] = useState<Layer[]>([])

  const toggleLayer = (layerName: string) => {
    setActiveLayers(prev => {
      const layer = layers.find(l => l.name === layerName)!
      return prev.some(l => l.name === layerName)
        ? prev.filter(l => l.name !== layerName)
        : [...prev, { ...layer, active: true }]
    })
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Bản đồ Đà Nẵng - OpenStreetMap</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 p-4 overflow-y-auto border-r">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Lớp bản đồ</h2>
            <div className="space-y-2">
              {layers.map((layer) => (
                <div key={layer.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`layer-${layer.name}`}
                    checked={activeLayers.some(l => l.name === layer.name)}
                    onChange={() => toggleLayer(layer.name)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`layer-${layer.name}`}
                    className="ml-2 text-gray-700"
                  >
                    {layer.displayName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            center={[16.0544, 108.2022]} // Tọa độ trung tâm Đà Nẵng
            zoom={12}
            scrollWheelZoom={true}
            className="h-full"
          >
            {/* OpenStreetMap Base Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Các overlay layer từ GeoServer */}
            <LayersControl position="topright">
              {activeLayers.map((layer) => (
                <LayersControl.Overlay
                  key={layer.name}
                  name={layer.displayName}
                  checked
                >
                  <TileLayer
                    url={layer.url}
                    attribution="GeoServer"
                  />
                </LayersControl.Overlay>
              ))}
            </LayersControl>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default MapView