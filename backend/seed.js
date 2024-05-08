// seed.js

const mongoose = require('mongoose');
const Locations = require('./models/Locations'); // Adjust the path accordingly

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/zomato', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Define an array of locations
const locationsData = [
    { location: 'Agra Restaurants', detail: 'Details of Agra Restaurants' },
    { location: 'Ahmedabad Restaurants', detail: 'Details of Ahmedabad Restaurants' },
    { location: 'Bangalore Restaurants', detail: 'Details of Bangalore Restaurants' },
    { location: 'Chennai Restaurants', detail: 'Details of Chennai Restaurants' },
    { location: 'Delhi Restaurants', detail: 'Details of Delhi Restaurants' },
    { location: 'Hyderabad Restaurants', detail: 'Details of Hyderabad Restaurants' },
    { location: 'Jaipur Restaurants', detail: 'Details of Jaipur Restaurants' },
    { location: 'Kolkata Restaurants', detail: 'Details of Kolkata Restaurants' },
    { location: 'Lucknow Restaurants', detail: 'Details of Lucknow Restaurants' },
    { location: 'Mumbai Restaurants', detail: 'Details of Mumbai Restaurants' },
    { location: 'Nagpur Restaurants', detail: 'Details of Nagpur Restaurants' },
    { location: 'Patna Restaurants', detail: 'Details of Patna Restaurants' },
    { location: 'Pune Restaurants', detail: 'Details of Pune Restaurants' },
    { location: 'Surat Restaurants', detail: 'Details of Surat Restaurants' },
    { location: 'Varanasi Restaurants', detail: 'Details of Varanasi Restaurants' },
    { location: 'Chandigarh Restaurants', detail: 'Details of Chandigarh Restaurants' },
    { location: 'Coimbatore Restaurants', detail: 'Details of Coimbatore Restaurants' },
    { location: 'Indore Restaurants', detail: 'Details of Indore Restaurants' },
    { location: 'Visakhapatnam Restaurants', detail: 'Details of Visakhapatnam Restaurants' },
    { location: 'Kochi Restaurants', detail: 'Details of Kochi Restaurants' }
  ];
  

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Remove existing data
    await Locations.deleteMany({});
    
    // Insert new data
    await Locations.insertMany(locationsData);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    db.close();
  }
};

// Execute the seed function
seedDatabase();
