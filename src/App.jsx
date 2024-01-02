import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import ViewBook from './components/ViewBook';
import Cart from './components/Cart';
import store from './utils/store/appStore';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import OrderSuccessful from './components/OrderSuccessful';
import OrderDetails from './components/OrderDetails';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/home',
        index: true,
        element: <Home />,
      },
      {
        path: '/book/:id',
        element: <ViewBook />,
      },
      {
        path: '/home/profile',
        element: <Profile />,
      },
      {
        path: '/home/Wishlist',
        element: <Wishlist />,
      },
      {
        path: '/home/ordersuccessful',
        element: <OrderSuccessful />
      },
      {
        path: '/home/orders',
        element: <OrderDetails />
      }
    ],
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/cart', element: <Cart />
  }
]);

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
