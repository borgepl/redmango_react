import React from "react";
import withAuth from "../../HOC/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";


function MyOrders() {

  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({userId});
  console.log(isLoading);
  console.log(data);

  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (
      <>
        <div className="d-flex align-items-center justify-content-between mx-5 mt-3">
          <h1 className="text-success">My Orders</h1>
        </div>  
        <OrderList isLoading={isLoading} orderData={data?.apiResponse.result} />
      </>  
    )}
  </>
  );
}

export default withAuth(MyOrders);