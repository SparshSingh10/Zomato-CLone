import React, { useState, useEffect } from 'react';
import Navbar from './Navabr'; // Assuming you have Navbar component defined
import axios from 'axios';


function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    number: '',
    gender: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('myToken');
      console.log(token)
      if (!token) {
        throw new Error('No token found');
      }
  
      // Parse the token string to get the user object
      const user = JSON.parse(token);
  
      // Fetch user data using the user ID
      const response = await axios.get(`http://localhost:8080/profile/${user._id}`);
      const userData = response.data;
  
      // Update user state with fetched data
      setUser(userData);
      // navigate
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  console.log(user)
  const handleChange = (e) => {
    setUser({...user,[e.target.id]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated user data to the server
      await axios.patch(`http://localhost:8080/profile/${user._id}`, user);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <div className='bg-blue-400'>
        <Navbar />
      </div>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block"></aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                          Your first name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your first name"
                          value={user.firstName}
                          onChange={handleChange} 
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                          Your last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your last name"
                          value={user.lastName}
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="your.email@mail.com"
                        value={user.email}
                        onChange={handleChange} 
                        required
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="address" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                        Your address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="123 Main St"
                        value={user.address}
                        onChange={handleChange} 
                        required
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="number" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                        Your phone number
                      </label>
                      <input
                        type="tel"
                        id="number"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="123-456-7890"
                        value={user.number}
                        onChange={handleChange} 
                        required
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="gender" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">
                        Your gender
                      </label>
                      <select
                        id="gender"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        value={user.gender}
                        onChange={handleChange} 
                        required
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                   
                    <div className="mt-8">
                      <button
                        type="submit" 
                        className="w-full py-3.5 px-5 text-base font-medium text-white bg-[#202142] rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
