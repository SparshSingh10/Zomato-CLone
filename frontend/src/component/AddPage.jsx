import React, { useState, useEffect } from 'react';
import Navbar from './Navabr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLocationPage() {
  const [location, setLocation] = useState('');
  const [detail, setDetail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('myToken');
    if (!accessToken) {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  }; 
  const token = localStorage.getItem('myToken');
  console.log(token)
  if (!token) {
    throw new Error('No token found');
  }
  

  const user = JSON.parse(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8080/page", {
        userId:user._id,
        location: location,
        detail: detail
      });
      navigate('/')
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <div className="bg-cover bg-center bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')] h-screen overflow-hidden">
      <Navbar />
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white mb-8">Add a Location</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className="border-white border bg-transparent text-white rounded-lg w-64 p-2 mr-16" placeholder="Enter location" value={location} onChange={handleLocationChange} />
          <input type="text" className="border-white border bg-transparent text-white rounded-lg w-64 p-2 mr-16" placeholder="Enter details" value={detail} onChange={handleDetailChange} />
          <button type="submit" className="bg-blue-500 opacity-80 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4">Add Location</button>
        </form>
      </div>
    </div>
  );
}

export default AddLocationPage;
