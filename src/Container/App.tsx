import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import Home from '../Pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import MenuItemDetails from '../Pages/MenuItemDetails';
import { useDispatch } from 'react-redux';
import { useGetShoppingCartQuery } from '../Apis/shoppingCartApi';
import { setShoppingCart } from '../Redux/shoppingCartSlice';
import ShoppingCart from '../Pages/ShoppingCart';


function App() {

  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery("8eb30672-fadf-4917-89e7-4f308fb30a72");

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);


  return (
    (<div>
     <Header />
     <div className="pb-5">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
     </div>
    <Footer />
    </div>)
  );
}

export default App;
