import React, { useState } from 'react';
import { Bell, User, ChevronRight, MapPin, Droplets, Bug, Shield, TrendingUp, Calendar, Activity, BarChart3, Mic, MessageSquare } from 'lucide-react';

const FarmDashboard = () => {
  const [currentWeather] = useState({
    location: 'Current location',
    temperature: 27,
    humidity: 12,
    rain: '10mm',
    condition: 'Sunny'
  });

  const [recommendations] = useState([
    {
      icon: <Droplets className="w-4 h-4 text-blue-500" />,
      text: 'Moisture low → irrigate today evening',
      type: 'urgent'
    },
    {
      icon: <Bug className="w-4 h-4 text-red-500" />,
      text: 'Pest outbreak nearby → inspect brinjal crop',
      type: 'warning'
    },
    {
      icon: <Shield className="w-4 h-4 text-green-500" />,
      text: 'Maintain soil health → Add Bio fertilizer',
      type: 'advice'
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-orange-500" />,
      text: 'Tomato price rising → Harvest early batch',
      type: 'opportunity'
    }
  ]);

  const [fieldReport] = useState([
    { label: 'Soil health', value: 90, color: '#4CAF50' },
    { label: 'Nutrients', value: 80, color: '#2196F3' },
    { label: 'Moisture', value: 75, color: '#FF9800' },
    { label: 'Rainfall', value: 50, color: '#9C27B0' }
  ]);

  const CircularProgress = ({ value, color, label }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <svg className="transform -rotate-90 w-20 h-20">
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={color}
              strokeWidth="6"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-800">{value}%</span>
          </div>
        </div>
        <span className="text-sm text-gray-600 mt-2 text-center">{label}</span>
      </div>
    );
  };

  const WeatherIcon = () => (
    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
      <div className="w-8 h-8 bg-yellow-300 rounded-full relative">
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                Namaskaram, <span className="text-orange-500">Rajan!</span> 👋
              </h1>
              <p className="text-sm text-gray-600">Here's today's update for your farm</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                <User className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Government Schemes Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 mx-4 mt-4 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-sm">GOVT. SCHEMES</h3>
              <p className="text-white text-xs opacity-90">Check Now</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Current Weather */}
        <div className="mx-4 mt-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Current Weather</h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                View Forecast
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentWeather.location}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {currentWeather.temperature}°C
                </div>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>💧 Hum: {currentWeather.humidity}%</span>
                  <span>🌧️ Rain: {currentWeather.rain}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <WeatherIcon />
                <span className="text-sm text-gray-600 mt-1">{currentWeather.condition}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mx-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{rec.icon}</div>
                  <p className="text-sm text-gray-700 flex-1">{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Report */}
        <div className="mx-4 mt-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Field Report</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-6">
              {fieldReport.map((item, index) => (
                <CircularProgress
                  key={index}
                  value={item.value}
                  color={item.color}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl mb-1">📅</span>
              <span className="text-xs text-gray-600">Crop Calendar</span>
            </div>
            
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl mb-1">📊</span>
              <span className="text-xs text-gray-600">Log Activity</span>
            </div>
            
            <div className="flex flex-col items-center p-2">
              <span className="text-2xl mb-1">📈</span>
              <span className="text-xs text-gray-600">Market Prices</span>
            </div>
            
            <div className="flex flex-col items-center p-2 bg-blue-100 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-lg">🎤</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-2 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-lg">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmDashboard;