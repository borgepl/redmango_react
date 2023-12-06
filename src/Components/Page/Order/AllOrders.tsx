import React, { useEffect, useState } from "react";
import { MainLoader } from "../Common";
import OrderList from "./OrderList";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import withAdminAuth from "../../../HOC/withAdminAuth";
import { SD_Status } from "../../../Utility/SD";
import inputHelper from "../../../Helper/InputHelper";

const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.COMPLETED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.CANCELLED,
];

function AllOrders() {
  
  const [filters, setFilters] = useState({ searchString: "", status: "" });

  const [orderData, setOrderData] = useState([]);
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  //const {data, isLoading} = useGetAllOrdersQuery("");

  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
    }),
  });

  const handleFilters = () => {
   
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
  {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
    }
  }, [data]);
  
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-3">
            <h1 className="text-success">Orders List</h1>
            <div className="d-flex" style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control mx-2"
                name="searchString"
                onChange={handleChange}
                placeholder="Search Name, Email or Phone"
              />
             <select
                className="form-select w-50 mx-2"
                onChange={handleChange}
                name="status"
              >
                {filterOptions.map((item, index) => (
                  <option  key={index} value={item === "All" ? "" : item}>{item}</option>
                ))}
              </select>
              <button className="btn btn-outline-success" onClick={handleFilters}>Filter</button>
            </div>
          </div>  
          <OrderList isLoading={isLoading} orderData={orderData} />
        </>  
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);