import React, { useState } from "react";
import MapComponent from "./components/Map";
import LayerControl from "./components/LayerControl";
import Search from "./components/Search";

const App: React.FC = () => {
  const [layers, setLayers] = useState([
    // {
    //   id: "district_boundaries",
    //   name: "Ranh giới quận",
    //   url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:district_boundaries&outputFormat=application/json",
    //   visible: false,
    // },
    // {
    //   id: "roads",
    //   name: "Roads",
    //   url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:roads&outputFormat=application/json",
    //   visible: false,
    // },
    {
      id: "lienchieu_trees",
      name: "Cây ở Liên Chiểu",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:lienchieu_trees&outputFormat=application/json",
      visible: false,
    },
    {
      id: "camle_trees",
      name: "Cây ở Cẩm Lệ",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:camle_trees&outputFormat=application/json",
      visible: false,
    },
    {
      id: "hoavang_trees",
      name: "Cây ở Hòa Vang",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:hoavang_trees&outputFormat=application/json",
      visible: false,
    },
    {
      id: "sontra_trees",
      name: "Cây ở Sơn Trà",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:sontra_trees&outputFormat=application/json",
      visible: false,
    },
    {
      id: "thanhkhe_trees",
      name: "Cây ở Thanh Khê",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:thanhkhe_trees&outputFormat=application/json",
      visible: false,
    },
    {
      id: "haichau_trees",
      name: "Cây ở Hải Châu",
      url: "http://localhost:8888/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:haichau_trees&outputFormat=application/json",
      visible: false,
    },
  ]);

  const handleToggleLayer = (id: string) => {
    setLayers(
      layers.map((layer) => {
        return layer.id === id ? { ...layer, visible: !layer.visible } : layer;
      })
    );
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log("Searching for:", query);
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
