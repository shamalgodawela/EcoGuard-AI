'use client';

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../NavBar/Navbar";

// Red marker icon using public URL
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


export default function AllReportsMap() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/ReportRoutes/");
        const data = await res.json();
        setReports(data.reports || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load incident data");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar/>

      <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
        {/* Top Stats Section */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Total Incidents Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Incidents</p>
                    <p className="text-4xl font-bold mt-2">{loading ? "-" : reports.length}</p>
                  </div>
                  <div className="text-blue-300 opacity-50">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">System Status</p>
                    <p className="text-2xl font-bold mt-2">Active</p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Last Updated Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Last Updated</p>
                    <p className="text-lg font-bold mt-2">Just now</p>
                  </div>
                  <div className="text-purple-300 opacity-50">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-.707.707a1 1 0 101.414 1.414L9 9.414V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Data Sync Card */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Sync Status</p>
                    <p className="text-lg font-bold mt-2">Synchronized</p>
                  </div>
                  <div className="text-orange-300 opacity-50">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 102 0V6h10a1 1 0 100-2H4zm-2 9a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 112 0 1 1 0 01-2 0zm4-1a1 1 0 100-2 1 1 0 000 2zm2 1a1 1 0 110-2 1 1 0 010 2zm4-4a1 1 0 100-2 1 1 0 000 2zm0 2a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Environmental Incidents Map
            </h1>
            <p className="text-gray-600 font-medium">
              Real-time monitoring of environmental incidents across the region
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col px-6 lg:px-12 py-8">
          <div className="max-w-7xl mx-auto w-full flex-1">
            {/* Map Container */}
            <div className="rounded-xl shadow-xl overflow-hidden border border-gray-200 h-96 md:h-[600px] lg:h-[700px] bg-gray-50">
              {loading ? (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-b-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading incident data...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full bg-red-50">
                  <div className="text-center">
                    <div className="text-red-600 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-medium text-lg">{error}</p>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={[6.9271, 79.8612]}
                  zoom={8}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {Array.isArray(reports) &&
                    reports.map((report) => (
                      <Marker
                        key={report.id}
                        position={[
                          Number(report.latitude || 0),
                          Number(report.longitude || 0),
                        ]}
                        icon={redIcon}
                      >
                        <Popup>
                          <div className="w-72 bg-white text-gray-900 text-sm p-4 rounded-lg">
                            <div className="mb-4 border-b border-gray-200 pb-3">
                              <strong className="text-gray-900 block text-base flex items-center">
                                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                Incident Report
                              </strong>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <strong className="text-gray-700 text-xs block uppercase tracking-wider">Description</strong>
                                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{report.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                                <div className="bg-gray-50 p-2 rounded">
                                  <strong className="text-gray-700 text-xs block uppercase tracking-wider">Latitude</strong>
                                  <p className="text-gray-600 text-xs font-mono mt-1">{Number(report.latitude || 0).toFixed(5)}</p>
                                </div>
                                <div className="bg-gray-50 p-2 rounded">
                                  <strong className="text-gray-700 text-xs block uppercase tracking-wider">Longitude</strong>
                                  <p className="text-gray-600 text-xs font-mono mt-1">{Number(report.longitude || 0).toFixed(5)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>
              )}
            </div>

            {/* Summary Section */}
            {!loading && !error && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md">
                  <h3 className="text-gray-900 font-bold text-lg mb-3">Incident Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Incidents</span>
                      <span className="text-2xl font-bold text-blue-600">{reports.length}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Data Source</span>
                      <span className="text-sm font-medium text-gray-900">Real-time API</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md">
                  <h3 className="text-gray-900 font-bold text-lg mb-3">Quick Info</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      This map displays all environmental incidents reported in your monitoring system. Red markers indicate incident locations.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-xs text-blue-900">
                        <strong>Tip:</strong> Click on any marker to view detailed incident information including coordinates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}