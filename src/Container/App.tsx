import React from 'react';
import { Footer, Header } from '../Components/Layout';
import Home from '../Pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import MenuItemDetails from '../Pages/MenuItemDetails';


function App() {

  return (
    (<div>
     <Header />
     <div className="pb-5">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
     </div>
    <Footer />
    </div>)
  );
}

export default App;
