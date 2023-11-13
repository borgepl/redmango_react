import React, { useState } from "react";
import inputHelper from "../Helper/InputHelper";
import { useLoginUserMutation } from "../Apis/authApi";
import { authResponse } from "../Interfaces";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Redux/userAuthSlice";
import userFromTokenModel from "../Interfaces/userFromTokenModel";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Page/Common";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
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
    
            const response: authResponse = await loginUser({
                userName: userInput.userName,
                password: userInput.password,
                
            });
            if (response.data) {
                if (response.data.isAuthSuccessful === true) {
                    console.log(response.data);
                    const {unique_name, email, Id, role} : userFromTokenModel = jwtDecode(response.data.token);
                    const phone = response.data.userDTO?.phoneNo;
                    let fullName = "";
                    if (response.data.userDTO?.name === null) {
                        fullName = unique_name;
                    } else {
                        fullName = response.data.userDTO?.name!;
                    }
                    localStorage.setItem("token",response.data.token);
                    dispatch(setLoggedInUser({fullName, id:Id, email, phone, role}));
                    navigate("/");
                }
                
            } else if (response.error) {
                console.log(response.error);
                console.log(response.error.data?.errorMessage);
                setError(response.error.data?.errorMessage);
            };
    
            setLoading(false);
        };

  return (
    <div className="container text-center">
        {loading && <MainLoader/>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={userInput.userName}
              onChange={handleUserInput}
              name="userName"
              required
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={userInput.password}
              onChange={handleUserInput}
              name="password"
              required
            />
          </div>
        </div>

        <div className="mt-2">
            {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;