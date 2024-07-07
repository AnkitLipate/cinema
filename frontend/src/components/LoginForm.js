import React, { useState, useRef, useEffect } from 'react';
import Login from '../API/Login';

function LoginForm({ onClose, onLogin }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await Login(BASE_URL, formData.email, formData.password);

      if (userData) {
        setFormData({
          email: '',
          password: '',
        });
        onClose();
        onLogin(userData);
      } else {
        console.error('Login was unsuccessful.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mx-auto mt-5' ref={formRef}>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm  mb-2'
          ></label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-gray-700 text-sm  mb-2'
          ></label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='text-center'>
          <button
            type='submit'
            className='bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
