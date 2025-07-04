
import React, { useState } from 'react';
import './index.css';

function Dashboard() {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

const BASE_URL = 'http://localhost:5000';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/business-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, location }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    try {
      const response = await fetch(`${BASE_URL}/regenerate-headline`);
      const result = await response.json();
      setData(prev => ({ ...prev, headline: result.headline }));
    } catch (error) {
      console.error('Error regenerating headline:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Local Business Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {data && (
        <div className="mt-6 bg-white p-4 rounded shadow-md">
          <p><strong>Simulated Google Rating:</strong> {data.rating}</p>
          <p><strong>Number of Reviews:</strong> {data.reviews}</p>
          <p><strong>SEO Headline:</strong> {data.headline}</p>
          <button
            onClick={regenerateHeadline}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Dashboard />
    </div>
  );
}

