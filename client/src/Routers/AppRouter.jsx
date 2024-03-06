import React, { useContext } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SingInPage from '../modules/auth/SingInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../modules/admin/AdminLayout';
import UserPage from '../modules/admin/users/UserPage';
import ClientLayout from '../modules/admin/products/ClientLayout';

const AppRouter = () => {
  const {user} = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
        <>
          {
            user.signed ? (
            <>
            <Route path='/' element={<AdminLayout/>}>
              <Route path='/' element={<UserPage />}/>
              <Route path='user' element={<UserPage />}/>
              <Route path='admin' element={<>Administrador Miguel</>}/>
              <Route path='client' element={<ClientLayout/>}/>
            </Route>
            </>) : (<Route path='/' element={<SingInPage/>} />)  
          }
        <Route path='/*' element={<>404 Not Found</>}/>
      </> 
    )
  )
  return <RouterProvider router={router}/>; 
};

export default AppRouter;