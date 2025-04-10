import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style } from "ol/style";
import {
  // getAirportStyle,
  // getBridgesStyle,
  // getCityBoundaryStyle,
  getDistrictStyle,
  getRoadStyle,
  // getUniversityStyle,
  getTreeStyle,
  // getWardStyle,
  // getWaterStyle,
  // getWaterwaysStyle,
} from "../utils/StyleGenerator.ts";
import { Pixel } from "ol/pixel";

interface MapComponentProps {
  layers: {
    id: string;
    name: string;
    url: string;
    visible: boolean;
    style?: Style;
  }[];
}

const MapComponent: React.FC<MapComponentProps> = ({ layers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [treeInfo, setTreeInfo] = useState<any | null>(null); // State to store tree info
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to toggle popup visibility

  // Khởi tạo bản đồ
  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
      controls: defaultControls(),
      view: new View({
        center: fromLonLat([108.2208, 16.068]),
        zoom: 12,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });

    setMap(initialMap);

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  // Cập nhật các layer mỗi khi layers thay đổi
  useEffect(() => {
    if (!map) return;

    // Xoá các vector layer cũ
    map
      .getLayers()
      .getArray()
      .forEach((layer) => {
        if (layer instanceof VectorLayer) {
          map.removeLayer(layer);
        }
      });

    // Thêm layer mới
    layers.forEach((layerConfig) => {
      if (!layerConfig.visible) return;

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: layerConfig.url,
          format: new GeoJSON(),
        }),
        style: layerConfig.style,
      });

      if (layerConfig.id.includes("trees")) {
        vectorLayer.setStyle((feature) => getTreeStyle(feature));
      } else {
        switch (layerConfig.id) {
          case "district_boundaries":
            vectorLayer.setStyle((feature) => getDistrictStyle(feature));
            break;
          case "roads":
            vectorLayer.setStyle((feature) => getRoadStyle(feature));
            break;
          default:
            break;
        }
      }

      vectorLayer.set("name", layerConfig.name);
      map.addLayer(vectorLayer);
    });
  }, [map, layers]);

  // Đăng ký sự kiện click (1 lần duy nhất)
  useEffect(() => {
    if (!map) return;

    const handleClick = (evt: { pixel: Pixel }) => {
      map.forEachFeatureAtPixel(evt.pixel, function (feature, _) {
        const id = feature.getId();
        const name = feature.get("sottcay");
        const status = feature.get("sinhtruong");
        const type = feature.get("chungloai");
        const plantingYear = feature.get("namtrong");
        const duongKinh = feature.get("duongkingo");
        const height = feature.get("chieucaoca");

        if (name) {
          // Cập nhật thông tin cây vào state và hiển thị popup
          setTreeInfo({
            id,
            name,
            type,
            status,
            plantingYear,
            duongKinh,
            height,
          });
          setShowPopup(true); // Show popup when a tree is clicked
        }
      });
    };

    map.on("singleclick", handleClick);

    return () => {
      map.un("singleclick", handleClick);
    };
  }, [map]);

  // Render tree information as a popup
  const renderPopup = () => {
    if (!showPopup || !treeInfo) return null;

    return (
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-4 border shadow-lg z-50 w-80">
        <h3 className="text-lg font-semibold mb-2">Thông tin về cây</h3>
        <p>
          <strong>Mã số cây:</strong> {treeInfo.name}
        </p>
        <p>
          <strong>Giống cây:</strong> {treeInfo.type}
        </p>
        <p>
          <strong>Trạng thái:</strong> {treeInfo.status}
        </p>
        <p>
          <strong>Năm trồng:</strong> {treeInfo.plantingYear}
        </p>
        <p>
          <strong>Đường kính gốc:</strong> {treeInfo.duongKinh}cm
        </p>
        <p>
          <strong>Chiều cao cây:</strong> {treeInfo.height}m
        </p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      {renderPopup()}
    </div>
  );
};

export default MapComponent;
