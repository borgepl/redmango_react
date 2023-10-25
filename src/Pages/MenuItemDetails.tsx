import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMenuItemByIdQuery } from '../Apis/menuItemApi';
import { useUpdateShoppingCartMutation } from '../Apis/shoppingCartApi';
import { MainLoader, MiniLoader } from '../Components/Page/Common';

export default function MenuItemDetails() {

    const {menuItemId} = useParams();
    const {data, isLoading} = useGetMenuItemByIdQuery(menuItemId);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
    const [updateShoppingCart] = useUpdateShoppingCartMutation();

    const handleAddToCart = async (menuItemId: number) => {
      setIsAddingToCart(true);

      const response = await updateShoppingCart({
        menuItemId:menuItemId,
        updateQuantityBy:quantity,
        userId:'8eb30672-fadf-4917-89e7-4f308fb30a72'
      });

      console.log(response);

      setIsAddingToCart(false);
    };

    const handleQuantity = (counter: number) => {
        let newquantity = quantity + counter;
        if (newquantity === 0) {
            setQuantity(1);
        } else
        setQuantity(quantity + counter);
        return;
    };

   //console.log(data);
   

  return (
    <div className="container pt-4 pt-md-5">

    {!isLoading ?  (<div className="row">
      <div className="col-7">
        <h2 className="text-success">{data.result?.name}</h2>
        <span>
          <span
            className="badge text-bg-dark pt-2"
            style={{ height: "40px", fontSize: "20px" }}
          >
            {data.result.category}
          </span>
        </span>
        <span>
          <span
            className="badge text-bg-light pt-2"
            style={{ height: "40px", fontSize: "20px" }}
          >
            {data.result.specialTag}
          </span>
        </span>
        <p style={{ fontSize: "20px" }} className="pt-2">
          {data.result.description}
        </p>
        <span className="h3">€{data.result.price}</span> &nbsp;&nbsp;&nbsp;
        <span
          className="pb-2  p-3"
          style={{ border: "1px solid #333", borderRadius: "30px" }}
        >
          <i onClick={() => handleQuantity(-1)}
            className="bi bi-dash p-1"
            style={{ fontSize: "25px", cursor: "pointer" }}
          ></i>
          <span className="h3 mt-3 px-3">{quantity}</span>
          <i onClick={() => handleQuantity(+1)}
            className="bi bi-plus p-1"
            style={{ fontSize: "25px", cursor: "pointer" }}
          ></i>
        </span>
        <div className="row pt-4">
          <div className="col-5">
            {isAddingToCart ? (
            <button disabled className='btn btn-success form-control'>
              <MiniLoader/>
            </button>
            ) 
            : ( 
            <button className="btn btn-success form-control" onClick={() => handleAddToCart(data.result?.id)}>
              Add to Cart
            </button>
            )}
           
          </div>

          <div className="col-5 ">
            <button className="btn btn-secondary form-control" onClick={() => navigate(-1)}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="col-5">
        <img
          src={data.result.image}
          width="100%"
          style={{ borderRadius: "50%" }}
          alt="No content"
        ></img>
      </div>
    </div>) 
    : 
    ( <MainLoader />) }

    
  </div>
  )
}


