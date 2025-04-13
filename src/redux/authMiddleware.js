import axios from 'axios';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure
} from './authSlice';

const API_URL = 'https://fakestoreapi.com';

export const loginMiddleware = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // FakeStoreAPI returns { token: 'string' } on successful login
    // We'll use the username to get user details
    const usersResponse = await axios.get(`${API_URL}/users`);
    const user = usersResponse.data.find(u => u.username === credentials.username);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    dispatch(loginSuccess({
      ...user,
      token: response.data.token
    }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data || 'Invalid credentials'));
  }
};

export const registerMiddleware = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    
    // FakeStoreAPI returns { id, username, email, password } on successful registration
    const response = await axios.post(`${API_URL}/users`, {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      name: {
        firstname: userData.name.firstname,
        lastname: userData.name.lastname
      },
      phone: userData.phone
    });
    
    // Create a mock token since the API doesn't provide one
    const mockToken = `fake-jwt-token-${response.data.id}`;
    
    dispatch(registerSuccess({
      ...response.data,
      name: userData.name,
      phone: userData.phone,
      token: mockToken
    }));
  } catch (error) {
    dispatch(registerFailure(error.response?.data || 'Registration failed'));
  }
};