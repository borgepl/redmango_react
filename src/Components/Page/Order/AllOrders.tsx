import React from "react";
import { MainLoader } from "../Common";
import OrderList from "./OrderList";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import withAdminAuth from "../../../HOC/withAdminAuth";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList isLoading={isLoading} orderData={data.result} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);