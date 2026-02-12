import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../data/mockPlaces';
import polyline from "@mapbox/polyline";
import Routing from './Routing';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  // iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  // iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  // shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  places: Place[];
  center: [number, number];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
  route: [number, number][] | null;
  sourceMarker: [number, number] | null;
  destinationMarker: [number, number] | null;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

export const sourceIcon = createCustomIcon('#22c55e');
export const destinationIcon = createCustomIcon('#ef4444');
const placesIcon = createCustomIcon("#0992c2");

export default function MapView({
  places,
  center,
  selectedPlace,
  onPlaceSelect,
  route,
  sourceMarker,
  destinationMarker,
}: MapViewProps) {

  const decoded = polyline.decode(
    "kz{xEggtxHn@E|@iAtMcAq@k`Ap@yO_OyA"
  );

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} />
      {/* <Routing source={[40.7589, -73.9851]} destination={[40.7614, -73.9776]} /> */}

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={placesIcon}
          eventHandlers={{
            click: () => onPlaceSelect(place),
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{place.name}</h3>
              <p className="text-gray-600">{place.category}</p>
              <p className="text-yellow-500">★ {place.rating}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {sourceMarker && (
        <Marker position={sourceMarker} icon={sourceIcon}>
          <Popup>
            <div className="text-sm font-semibold">Source</div>
          </Popup>
        </Marker>
      )}

      {destinationMarker && (
        <Marker position={destinationMarker} icon={destinationIcon}>
          <Popup>
            <div className="text-sm font-semibold">Destination</div>
          </Popup>
        </Marker>
      )}

      {route && (
        <Polyline
          positions={route}
          color="#3b82f6"
          weight={4}
          opacity={0.7}
        />
      )}

      {/* <Polyline positions={decoded} color='red'/> */}
      <Routing />
    </MapContainer>
  );
}
