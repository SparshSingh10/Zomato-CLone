import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navabr";

import axios from "axios"; // Import axios for making HTTP requests

function Page() {
  const [locationData, setLocationData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/page");
      // console.log(response.data);
      if (response.status === 200) 
      setLocationData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('myToken');
      if (!token) {
        throw new Error('No token found');
      }
      const user = JSON.parse(token);
      console.log(user._id);
      await axios.delete(`http://localhost:8080/page/${id}`, {
        data: { userId: user._id } // Include userId in the request body
      });
      console.log('Location deleted successfully');
      // Handle any other logic after deletion if needed
    } catch (error) {
      console.error('Error deleting location:', error);
      if (error.response && error.response.status === 403) {
        alert('You Are not the Owner'); // Display alert for unauthorized access
      }
      // Handle other error scenarios if needed
    }
  };
  
  


 
  return (
    <div className="">
      <div className="h-[570px] bg-cover bg-center bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')]">
        <Navbar />
        <div className="content h-[80%] flex flex-col items-center justify-center ">
          <img
            className="w-64 flex justify-center"
            src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png"
            alt=""
          />
          <h1 className="text-white flex justify-center m-4 text-4xl max-w-lg text-center">
            Find the best restaurants, cafés and bars in India
          </h1>
        </div>
      </div>
      <div className="location my-16  ">
        <div className="heading flex justify-center">
          <h1 className="text-4xl">Popular locations in</h1>
          <img
            className="mx-2.5"
            src="https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp"
            alt=""
          />
          <h1 className="text-4xl">India</h1>
        </div>
        <div className=" text-center max-w-5xl text-2xl mt-9 mx-auto">
          <p className=" text-gray-500">
            From swanky upscale restaurants to the cosiest hidden gems serving
            the most incredible food, Zomato covers it all. Explore menus, and
            millions of restaurant photos and reviews from users just like you,
            to find your next great meal.
          </p>
        </div>

        <div className="places  mt-14 flex flex-wrap w-4/6 mx-auto">
          {locationData.map((item,index) => (
            <div key={index} className="locationbox border w-72 border-gray-300 rounded p-4 mb-4 m-3 flex items-center justify-between">
              <NavLink to={`/page/${item._id}`} className="flex items-center" activeClassName="text-red-500">
                <h5 className="text-black mr-2 text-lg">{item.location}</h5>
                <p className="text-black mr-2 text-sm">{item.detail}</p>
              </NavLink>
              <div className="flex items-center">
                <Link to={`/edit/${item._id}/edit`}>
                <button className="text-green-700 hover:text-green-900 mr-2">Edit</button>
                </Link>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer mt-10">
    <div className="section1 flex justify-between">
        <img className="ml-60 h-7"
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;*,*"
            alt=""
        />
        <div className="section1.2 flex">
            <div className="dropdown relative">
                <button className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border">
                    India
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1 4 4 9 1"
                        />
                    </svg>
                </button>
                <div className="dropdown-menu absolute hidden bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700">
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Delhi
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Mumbai
                    </a>
                    {/* Add more cities here */}
                </div>
            </div>
            <div className="dropdown relative ml-2">
                <button className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border">
                    Language
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1 4 4 9 1"
                        />
                    </svg>
                </button>
                <div className="dropdown-menu absolute hidden bg-white divide-y divide-gray-100 rounded-md shadow w-44 dark:bg-gray-700">
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        English
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        Hindi
                    </a>
                    {/* Add more languages here */}
                </div>
            </div>
        </div>
    </div>
<section className="section2 flex justify-center w-100 p-4">
<section className="my-4">
    <h6 class="text-lg font-bold mb-2">About Zomato</h6>
    <nav className="text-gray-400">
        <a href="https://www.zomato.com/who-we-are" class="block mb-2">Who We Are</a>
        <a href="https://blog.zomato.com/" class="block mb-2">Blog</a>
        <a href="https://www.zomato.com/careers" class="block mb-2">Work With Us</a>
        <a href="https://www.zomato.com/investor-relations" class="block mb-2">Investor Relations</a>
        <a href="https://www.zomato.com/report-fraud" class="block mb-2">Report Fraud</a>
        <a href="https://blog.zomato.com/press-kit" class="block mb-2">Press Kit</a>
        <a href="https://www.zomato.com/contact" class="block mb-2">Contact Us</a>
    </nav>
</section>

<section className="my-4 mx-16">
    <h6 class="text-lg font-bold mb-2">Zomaverse</h6>
    <nav className="text-gray-400">
        <a href="https://www.zomato.com/" class="block mb-2">Zomato</a>
        <a href="https://www.blinkit.com/" class="block mb-2">Blinkit</a>
        <a href="https://www.feedingindia.org/" class="block mb-2">Feeding India</a>
        <a href="https://www.hyperpure.com/" class="block mb-2">Hyperpure</a>
        <a href="https://www.zomato.com/zomaland" class="block mb-2">Zomaland</a>
    </nav>
</section>

<section className="my-4 mx-16">
    <h6 class="text-lg font-bold mb-2">For Restaurants</h6>
    <nav className="text-gray-400">
        <a href="https://www.zomato.com/partner_with_us" class="block mb-2">Partner With Us</a>
        <a href="https://play.google.com/store/apps/details?id=com.application.services.partner&amp;hl=en_IN&amp;gl=US" class="block mb-2">Apps For You</a>
    </nav>
</section>

<section className="my-4 mx-16">
    <h6 class="text-lg font-bold mb-2">Learn More</h6>
    <nav className="text-gray-400">
        <a href="https://www.zomato.com/privacy" class="block mb-2">Privacy</a>
        <a href="https://www.zomato.com/security" class="block mb-2">Security</a>
        <a href="https://www.zomato.com/conditions" class="block mb-2">Terms</a>
        <a href="https://www.zomato.com/directory" class="block mb-2">Sitemap</a>
    </nav>
</section>

<section className="my-4 mx-16">
    <h6 class="text-lg font-bold mb-2">Social links</h6>
    <nav className="text-gray-400">
        <a href="https://in.linkedin.com/company/zomato" class="block mb-2">LinkedIn</a>
        <a href="https://www.instagram.com/zomato/" class="block mb-2">Instagram</a>
        <a href="https://twitter.com/zomato" class="block mb-2">Twitter</a>
        <a href="https://www.youtube.com/zomato" class="block mb-2">YouTube</a>
        <a href="https://www.facebook.com/zomato" class="block mb-2">Facebook</a>
    </nav>
</section>
</section>
<hr />

    <p className="w-3/5 text-center mx-auto text-gray-600">By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2024 © Zomato™ Ltd. All rights reserved.</p>
</div>

      </div>
    
  );
}

export default Page;
