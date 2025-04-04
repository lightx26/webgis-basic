import {Style, Fill, Stroke, Text} from 'ol/style';
import CircleStyle from "ol/style/Circle";

// Tạo danh sách màu sắc cố định cho quận
const districtColors: Record<string, string> = {
  '-7057631': `#f0ef8e`,
  '-7057629': '#95d27c',
  '-7057290': '#b064d4',
  '-7057031': '#27ed80',
  '-7056936': '#ec4620',
  '-7055161': '#c87b7a',
  '-7053087': '#676ece',
};

// Hàm tạo style dựa trên osm_id
export const getDistrictStyle = (feature: any) => {
  const osmId: number = feature.get('osm_id');
  const name: string = feature.get('name');

  // Nếu osm_id chưa có màu, tạo màu ngẫu nhiên
  if (!districtColors[osmId]) {
    // rgb ngẫu nhiên
    districtColors[osmId] = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
  }

  return new Style({
    stroke: new Stroke({
      color: 'black',
      width: 1,
    }),
    fill: new Fill({
      color: districtColors[osmId],
    }),
    text: new Text({
      text: name,
      font: 'bold 14px Arial',
      fill: new Fill({color: '#000'}),
      stroke: new Stroke({color: '#fff', width: 2}),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
      offsetY: 0, // Điều chỉnh vị trí dọc
      placement: 'point', // Hiển thị tại điểm trung tâm
    }),
  });
};

export const getCityBoundaryStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#333', // Đậm hơn để làm nổi bật ranh giới thành phố
      width: 3,
      lineDash: [10, 5], // Nét đứt để phân biệt với quận/huyện
    }),
    fill: new Fill({
      color: 'rgba(255, 175, 0, 0.2)', // Màu xám nhạt tạo hiệu ứng dense mà không lấn át các khu vực khác
    }),
  });
};

export const getWardStyle = (feature: any) => {
  const name: string = feature.get('name');
  const districtId: number = feature.get('belongs');

  return new Style({
    stroke: new Stroke({
      color: 'black',
      width: 0.8,
    }),
    fill: new Fill({
      color: districtColors[districtId],
    }),
    text: new Text({
      text: name,
      font: 'bold 8px Arial',
      fill: new Fill({color: '#000'}),
      stroke: new Stroke({color: '#fff', width: 2}),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
      offsetY: 0, // Điều chỉnh vị trí dọc
      placement: 'point', // Hiển thị tại điểm trung tâm
    }),
  });
};

export const getWaterwaysStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#72c8ff',
      width: 1.2,
    }),
  });
}

export const getWaterStyle = (feature: any) => {
  const name: string = feature.get('name');

  return new Style({
    fill: new Fill({
      color: '#aad3df',

    }),
    stroke: new Stroke({
      color: '#00aaff',
      width: 1,
    }),
    text: new Text({
      text: name,
      font: 'bold 10px Arial',
      fill: new Fill({color: '#000'}),
      stroke: new Stroke({color: '#fff', width: 2}),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
      offsetY: 0, // Điều chỉnh vị trí dọc
      placement: 'point', // Hiển thị tại điểm trung tâm
    }),
  });
}

export const getBridgesStyle = (feature: any) => {

  const name: string = feature.get('name');

  return new Style({
    stroke: new Stroke({
      color: '#ffcc00',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255, 204, 0, 0.5)',
    }),
    text: new Text({
      text: name,
      font: 'bold 6px Arial',
      fill: new Fill({color: '#000'}),
      stroke: new Stroke({color: '#fff', width: 2}),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
      offsetY: 0, // Điều chỉnh vị trí dọc
    })
  });
}

export const getUniversityStyle = (feature: any) => {
  const name: string = feature.get('name');

  return new Style({
    fill: new Fill({
      color: 'rgba(255, 204, 0, 1)',
    }),
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({color: '#ffcc00'}),
      stroke: new Stroke({color: '#fff', width: 2}),
    }),
    text: new Text({
      text: name,
      font: 'bold 6px Arial',
      fill: new Fill({color: '#000'}),
      stroke: new Stroke({color: '#fff', width: 2}),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
    }),
  });
}

export const getRoadStyle = (feature: any) => {
  const highwayType = feature.get('highway');

  const roadStyles: Record<string, { color: string; width: number; dash?: number[] }> = {
    motorway: { color: '#ff0000', width: 4 }, // Đỏ đậm - Đường cao tốc
    trunk: { color: '#ff6600', width: 3.5 }, // Cam - Đường quốc lộ chính
    primary: { color: '#ffcc00', width: 3 }, // Vàng - Đường chính
    secondary: { color: '#00ccff', width: 2.5 }, // Xanh dương - Đường phụ
    tertiary: { color: '#009900', width: 2 }, // Xanh lá - Đường hạng 3
    residential: { color: '#aaaaaa', width: 1.5 }, // Xám - Đường khu dân cư
    service: { color: '#666666', width: 1, dash: [4, 4] }, // Xám đậm, nét đứt - Đường phục vụ
  };

  const styleConfig = roadStyles[highwayType] || { color: '#000', width: 1 }; // Mặc định đen

  return new Style({
    stroke: new Stroke({
      color: styleConfig.color,
      width: styleConfig.width,
      lineDash: styleConfig.dash || undefined, // Chỉ dùng nét đứt khi có
    }),
  });
};

export const getAirportStyle = (feature: any) => {
  const name: string = feature.get('name');

  return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: '#5767ff' }),
      stroke: new Stroke({ color: '#fff', width: 2 }),
    }),
    fill: new Fill({
      color: 'rgba(87, 103, 255, 0.25)',
    }),
    stroke: new Stroke({
      color: '#5767ff',
      width: 3,
      lineCap: 'round',
    }),
    text: new Text({
      text: name,
      font: 'bold 6px Arial',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({ color: '#fff', width: 2 }),
      overflow: true, // Cho phép hiển thị ngay cả khi vượt ra ngoài ranh giới
      padding: [5, 5, 5, 5], // Thêm padding xung quanh text
    }),
  });
}
