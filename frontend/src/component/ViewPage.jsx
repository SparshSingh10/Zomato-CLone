import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [rating, setRating] = useState('');
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/page/${id}`);
        setLocation(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/location/${id}/addReview`, {rating,userName,text});
      setRating('');
      setUserName('');
      setText('');
      const response = await axios.get(`http://localhost:8080/page/${id}`);
      setLocation(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {location ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{location.location}</h1>
          <p className="text-lg mb-4">Description: {location.detail}</p>
          {/* Add more details about the location as needed */}

          

          {/* Display existing reviews if available */}
          <h2 className="text-xl font-bold mt-8 mb-4">Reviews</h2>
          {location.reviews && location.reviews.map(review => (
            <div key={review._id} className="bg-gray-100 p-4 mb-4 rounded">
              <p><span className="font-bold">{review.userName}</span> - {review.rating}</p>
              <p>{review.text}</p>
              
            </div>
          ))}
          {/* Review Form */}
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Review:</label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LocationPage;
