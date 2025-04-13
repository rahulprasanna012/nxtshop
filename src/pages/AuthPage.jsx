import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginMiddleware, registerMiddleware } from '../redux/authMiddleware';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: ''
    },
    phone: ''
  });
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await dispatch(loginMiddleware({
          username: formData.username,
          password: formData.password
        }));
      } else {
        await dispatch(registerMiddleware(formData));
      }
      navigate('/');
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'firstname' || name === 'lastname') {
      setFormData(prev => ({
        ...prev,
        name: {
          ...prev.name,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex mb-6 border-b">
        <button
          type="button"
          className={`py-2 px-4 font-medium ${isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium ${!isLogin ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login to Your Account' : 'Create New Account'}
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {typeof error === 'object' ? JSON.stringify(error) : error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstname">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.name.firstname}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.name.lastname}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="4"
          />
          {!isLogin && (
            <p className="text-xs text-gray-500 mt-1">At least 4 characters</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <>Don't have an account? <span className="font-medium">Register</span></>
          ) : (
            <>Already have an account? <span className="font-medium">Login</span></>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;