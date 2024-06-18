import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    genres: '',
    actors: '',
    directors: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${currentUser.uid}`);
        setPreferences(response.data);
      } catch (error) {
        console.error("Error fetching preferences: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [currentUser.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/profile/${currentUser.uid}`, preferences);
      console.log('Preferences saved:', response.data);
      alert('Preferences saved!');
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("Error saving preferences: " + error.message);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-3xl w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Dashboard</h2>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-4">Welcome, {currentUser.email}</h3>
          <button
            onClick={handleLogout}
            className="w-full p-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Favorite Genres</label>
            <input
              type="text"
              name="genres"
              value={preferences.genres}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Favorite Actors</label>
            <input
              type="text"
              name="actors"
              value={preferences.actors}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Favorite Directors</label>
            <input
              type="text"
              name="directors"
              value={preferences.directors}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
