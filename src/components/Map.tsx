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
  getAirportStyle,
  getBridgesStyle,
  getCityBoundaryStyle,
  getDistrictStyle,
  getRoadStyle,
  getUniversityStyle,
  getTreeStyle,
  getWardStyle,
  getWaterStyle,
  getWaterwaysStyle,
} from "../utils/StyleGenerator.ts";

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

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new Map({
      target: mapRef.current,
      controls: defaultControls(),
      view: new View({
        center: fromLonLat([108.2208, 16.068]), // Tọa độ trung tâm Đà Nẵng
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

  useEffect(() => {
    if (!map) return;

    // Xóa các layer vector cũ (trừ layer OSM)
    Array.from(map.getLayers().getArray()).forEach((layer) => {
      if (layer instanceof VectorLayer) {
        console.log("Removing layer:", layer.get("name"));
        map.removeLayer(layer);
      }
    });

    // Thêm các layer mới
    layers.forEach((layerConfig) => {
      if (!layerConfig.visible) return;

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: layerConfig.url,
          format: new GeoJSON(),
        }),
        style: layerConfig.style,
      });

      if (layerConfig.id === "district_boundaries") {
        vectorLayer.setStyle((feature) => getDistrictStyle(feature));
      } else if (layerConfig.id === "city_boundaries") {
        vectorLayer.setStyle(() => getCityBoundaryStyle());
      } else if (layerConfig.id === "ward_boundaries") {
        vectorLayer.setStyle((feature) => getWardStyle(feature));
      } else if (layerConfig.id === "waterways") {
        vectorLayer.setStyle(() => getWaterwaysStyle());
      } else if (layerConfig.id === "water") {
        vectorLayer.setStyle((feature) => getWaterStyle(feature));
      } else if (layerConfig.id === "bridges") {
        vectorLayer.setStyle((feature) => getBridgesStyle(feature));
      } else if (layerConfig.id === "university") {
        vectorLayer.setStyle((feature) => getUniversityStyle(feature));
      } else if (layerConfig.id === "roads") {
        vectorLayer.setStyle((feature) => getRoadStyle(feature));
      } else if (layerConfig.id === "airports") {
        vectorLayer.setStyle((feature) => getAirportStyle(feature));
      } else if (layerConfig.id === "trees") {
        vectorLayer.setStyle((feature) => getTreeStyle(feature));
      }

      vectorLayer.set("name", layerConfig.name);
      console.log("New layer added:", layerConfig.name);
      map.addLayer(vectorLayer);
    });
  }, [map, layers]);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default MapComponent;
