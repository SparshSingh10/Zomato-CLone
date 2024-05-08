import React, { useEffect, useState } from 'react';
import Navbar from './Navabr';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/page/${id}`);
      setLocation(response.data.location);
      setDetails(response.data.detail);
    } catch (err) {
      console.error('Error fetching location:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const token = localStorage.getItem('myToken');
      if (!token) {
        throw new Error('No token found');
      }
      const user = JSON.parse(token);

      await axios.patch(`http://127.0.0.1:8080/page/${id}`, {userId: user._id, location: location,detail: details});
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You Are not the Owner'); 
      }
      console.error('Error updating location:', error);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  return (
    <div className="bg-cover bg-center bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')] h-screen overflow-hidden">
      <Navbar />
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl text-white mb-8">Edit Location</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-white border bg-transparent text-white rounded-lg w-64 p-2 mr-16"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <input
            type="text"
            className="border-white border bg-transparent text-white rounded-lg w-64 p-2 mr-16"
            placeholder="Enter details"
            value={details}
            onChange={handleDetailsChange}
          />
          <button
            type="submit"
            className="bg-blue-500 opacity-80 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
