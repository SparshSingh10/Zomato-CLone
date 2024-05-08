import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navabr';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [flag, setLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        number: '',
        gender: 'male'
    });

    const handleLogin = () => {
        setLogin(true);
    };

    const handleSignup = () => {
        setLogin(false);
    };

    const handleLoginEmail = (e) => {
        setLoginEmail(e.target.value);
    };

    const handleLoginPassword = (e) => {
        setLoginPassword(e.target.value);
    };
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://127.0.0.1:8080/login", {
            email: loginEmail,
            password: loginPassword
        });
        const { token, user, msg } = response.data;
        const tokenObject = parseJwt(token);
        window.localStorage.setItem('myToken', JSON.stringify(tokenObject));
        navigate('/');
    } catch (error) {
        console.log('Sign Up first');
    }
};
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8080/register", formData);
            const { user, msg } = response.data;
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="relative bg-[url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')] bg-no-repeat bg-cover min-h-screen">
            <Navbar />
            <div className=" absolute inset-0 bg-black bg-opacity-50 filter blur-lg"></div>

            <div className='mx-auto pt-20 rounded-lg p-4 pt-1 w-2/4 relative z-10 overflow-hidden'>
                <div className='flex justify-between gap-2'>
                    <button className='bg-red-700 bg-opacity-50 hover:bg-red-500 text-white font-bold py-2 px-4 border rounded-3xl w-full' onClick={handleLogin}>Login</button>
                    <button className='bg-blue-700 bg-opacity-50 hover:bg-blue-500 text-white font-bold py-2 px-4 border rounded-3xl w-full' onClick={handleSignup}>Signup</button>
                </div>
                {flag ? <LoginForm handleSubmit={handleSubmit1} handleLoginEmail={handleLoginEmail} handleLoginPassword={handleLoginPassword} /> : <SignUpForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
            </div>
        </div>
    );
}

function LoginForm({ handleSubmit, handleLoginEmail, handleLoginPassword }) {
    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <input onChange={handleLoginEmail} className='bg-transparent text-white border border-white placeholder-white m-2 mt-12 rounded-3xl p-2 w-2/4' type="text" id="email" placeholder="Enter Your Email" autoComplete="current-email" />
            <input onChange={handleLoginPassword} className='bg-transparent border border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="password" id="password" placeholder="Enter Your password" autoComplete="current-password" />
            <button type="submit" className=' bg-opacity-50 bg-red-700 hover:bg-red-500 rounded p-3 my-2 focus:outline-none focus:shadow-outline text-white font-bold'>Login</button>
        </form>
    );
}

function SignUpForm({ handleInputChange, handleSubmit }) {
    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-12 rounded-3xl p-2 w-2/4' type="text" name="firstName" placeholder="Enter Your First Name" autoComplete="given-name" />
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="text" name="lastName" placeholder="Enter Your Last Name" autoComplete="family-name" />
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="text" name="email" placeholder="Enter Your Email" autoComplete="email" />
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="password" name="password" placeholder="Enter Your Password" autoComplete="new-password" />
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="text" name="address" placeholder="Enter Your Address" />
            <input onChange={handleInputChange} className='bg-transparent border text-white border-white placeholder-white m-2 mt-6 rounded-3xl p-2 w-2/4' type="text" name="number" placeholder="Enter Your Phone Number" autoComplete="tel" />
            <div className='flex'>
                <p className='text-white p-3'>Pick your gender:</p>
                <select onChange={handleInputChange} className='bg-transparent border border-white text-white rounded mt-3 w-15 h-7' name="gender" id="gender" defaultValue="male">
                    <option className='bg-red-500' value="male">Male</option>
                    <option className='bg-orange-500' value="female">Female</option>
                    <option className='bg-yellow-500' value="nonbinary">Nonbinary</option>
                    <option className='bg-green-500' value="asexual">Asexual</option>
                    <option className='bg-blue-500' value="transgender">Transgender</option>
                    <option className='bg-indigo-500' value="pansexual">Pansexual</option>
                    <option className='bg-purple-500' value="genderqueer">Genderqueer</option>
                </select>
            </div>
            <button type="submit" className='bg-opacity-50 bg-blue-700 hover:bg-blue-500 rounded p-3 my-2 focus:outline-none focus:shadow-outline text-white font-bold'>Sign Up</button>
        </form>
    );
}

export default Login;
