import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../Components/Layout';
import Home from '../Pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import MenuItemDetails from '../Pages/MenuItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShoppingCartQuery } from '../Apis/shoppingCartApi';
import { setShoppingCart } from '../Redux/shoppingCartSlice';
import ShoppingCart from '../Pages/ShoppingCart';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import jwtDecode from 'jwt-decode';
import userFromTokenModel from '../Interfaces/userFromTokenModel';
import { setLoggedInUser } from '../Redux/userAuthSlice';
import { userModel } from '../Interfaces';
import { RootState } from '../Redux/store';
import Payment from '../Pages/Payment';
import AccessDenied from '../Pages/AccessDenied';
import OrderConfirmed from '../Pages/Order/OrderConfirmed';
import MyOrders from '../Pages/Order/MyOrders';
import OrderDetails from '../Pages/Order/OrderDetails';
import AllOrders from '../Components/Page/Order/AllOrders';
import MenuItemList from '../Pages/MenuItem/MenuItemList';
import MenuItemUpsert from '../Pages/MenuItem/MenuItemUpsert';


function App() {

  const dispatch = useDispatch();
  const userDataFromStore: userModel = useSelector((state: RootState) => state.userAuthStore)
  const [skipValue, setSkipValue] = useState(true);
  const { data, isLoading } = useGetShoppingCartQuery(userDataFromStore.id, {skip:skipValue});

  useEffect(() => {
    
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const {unique_name, email, Id, role} : userFromTokenModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({fullName:unique_name, id:Id, email, phone:"", role}));
    }
   
  }, [])

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    if (userDataFromStore.id) setSkipValue(false);
  }, [userDataFromStore]);


  return (
    (<div>
     <Header />
     <div className="pb-5">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="order/orderconfirmed/:id" element={<OrderConfirmed />}></Route>
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="/order/OrderDetails/:id" element={<OrderDetails />} />
          <Route path="/menuitem/menuitemlist" element={<MenuItemList />} />
          <Route path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert />} />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
     </div>
    <Footer />
    </div>)
  );
}

export default App;
