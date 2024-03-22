import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './component/pages/App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './toolkitRedux/index.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './component/pages/Products.jsx'
import ProductItemPage from './component/pages/ProductItemPage.jsx'
import UserCartPage from './component/pages/UserCartPage.jsx'
import UserAccountPage from './component/pages/UserAccountPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/:category',
    element: <Products />,
  },
  {
    path: '/:category/:id',
    element: <ProductItemPage />,
  },
  {
    path: '/user',
    element: <UserAccountPage />,
  },
  {
    path: '/cart',
    element: <UserCartPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
