import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './Features/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchUsers } from './Features/userSlice';
import { fetchPosts } from './Features/postSlice';
import Navbar from './Components/Navbar';
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
