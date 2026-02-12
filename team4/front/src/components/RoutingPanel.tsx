import { useState } from 'react';
import { Navigation, MapPin, Clock, ArrowRight, X } from 'lucide-react';
import { calculateRoute, searchLocation, Route } from '../data/mockRoutes';

interface RoutingPanelProps {
  onRouteCalculated: (
    route: Route,
    source: [number, number],
    destination: [number, number]
  ) => void;
  onClose: () => void;
}

export default function RoutingPanel({ onRouteCalculated, onClose }: RoutingPanelProps) {
  const [sourceQuery, setSourceQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [sourceResults, setSourceResults] = useState<any[]>([]);
  const [destResults, setDestResults] = useState<any[]>([]);
  const [showSourceResults, setShowSourceResults] = useState(false);
  const [showDestResults, setShowDestResults] = useState(false);
  const [selectedSource, setSelectedSource] = useState<[number, number] | null>(null);
  const [selectedDest, setSelectedDest] = useState<[number, number] | null>(null);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const handleSourceSearch = (value: string) => {
    setSourceQuery(value);
    if (value.length > 0) {
      const results = searchLocation(value);
      setSourceResults(results);
      setShowSourceResults(true);
    } else {
      setShowSourceResults(false);
    }
  };

  const handleDestSearch = (value: string) => {
    setDestQuery(value);
    if (value.length > 0) {
      const results = searchLocation(value);
      setDestResults(results);
      setShowDestResults(true);
    } else {
      setShowDestResults(false);
    }
  };

  const handleSourceSelect = (result: any) => {
    setSourceQuery(result.name);
    setSelectedSource([result.lat, result.lng]);
    setShowSourceResults(false);
  };

  const handleDestSelect = (result: any) => {
    setDestQuery(result.name);
    setSelectedDest([result.lat, result.lng]);
    setShowDestResults(false);
  };

  const handleCalculateRoute = () => {
    if (selectedSource && selectedDest) {
      const route = calculateRoute(selectedSource, selectedDest);
      setCurrentRoute(route);
      onRouteCalculated(route, selectedSource, selectedDest);
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Navigation className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Route Planning</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22c55e] w-5 h-5" />
            <input
              type="text"
              value={sourceQuery}
              onChange={(e) => handleSourceSearch(e.target.value)}
              placeholder="Enter starting point..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {showSourceResults && sourceResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-50">
              {sourceResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSourceSelect(result)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm text-gray-800">{result.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ef4444] w-5 h-5" />
            <input
              type="text"
              value={destQuery}
              onChange={(e) => handleDestSearch(e.target.value)}
              placeholder="Enter destination..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {showDestResults && destResults.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-50">
              {destResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleDestSelect(result)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm text-gray-800">{result.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleCalculateRoute}
          disabled={!selectedSource || !selectedDest}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Calculate Route
        </button>
      </div>

      {currentRoute && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Navigation className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-800">{currentRoute.distance}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-800">{currentRoute.duration}</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">Directions</h3>
          <div className="space-y-3">
            {currentRoute.steps.map((step, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 mb-1">{step.instruction}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{step.distance}</span>
                    <ArrowRight className="w-3 h-3 mx-2" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
