import React, { useState } from "react";
import { SD_Roles } from "../Utility/SD";
import inputHelper from "../Helper/InputHelper";
import { useRegisterUserMutation } from "../Apis/authApi";
import { regResponse } from "../Interfaces";
import toastNotify from "../Helper/toastNotify";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Register() {

    const navigate = useNavigate();
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
      userName: "",
      password: "",
      phone: "",
      role: "",
      name: "",
    });
    
    const handleUserInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const response: regResponse = await registerUser({
            name: userInput.name,
            email: userInput.userName,
            phoneNo: userInput.phone,
            password: userInput.password,
            confirmPassword: userInput.password
        });
        if (response) {
            console.log(response);
        }
        if (response.data && response.data.isRegisterationSuccessful) {
            console.log(response.data);    
            toastNotify("Registration successful! Please login to continue.");
            navigate("/login");
            
        } else if (response.error) {
            console.log(response.error.data?.errors![0]);
            toastNotify(response.error.data?.errors![0],"error");
        };

        setLoading(false);
    };

  return (
    <div className="container text-center">
    {loading && <MainLoader/>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
              required
            />
          </div>
          
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone number"
              name="phone"
              value={userInput.phone}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select className="form-control form-select"
                name="role"
                required  value={userInput.role}
                onChange={handleUserInput}>
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.CUTOMER}`}>Customer</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;