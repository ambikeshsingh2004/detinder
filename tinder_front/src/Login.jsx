import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [emailid, setEmailId] = useState("cse22077@iiitk.ac.in");
  const [password, setPassword] = useState("Amb@1234");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [isloginform, setisloginform] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      console.log(emailid, password);
      const res = await axios.post(
        "http://localhost:4444/login",
        {
          emailid,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
      // console.log(res.data.uuser);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  const handlesignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4444/signup",
        { firstname, lastname, emailid, password },

        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="flex justify-center  my-15 ">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isloginform ? "Login" : "Signup"}
          </h2>
          <div>
            {!isloginform && (
              <>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                    {/* {emailIdjbjbej} */}
                  </div>
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                    className="input input-bordered w-full max-w-xs  focus:border-none"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                    {/* {emailIdjbjbej} */}
                  </div>
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                    className="input input-bordered w-full max-w-xs  focus:border-none"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email id</span>
                {/* {emailIdjbjbej} */}
              </div>
              <input
                type="text"
                value={emailid}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs  focus:border-none"
              />
            </label>
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label mt-5">
                <span className="label-text">Password</span>
              </div>
              <input
                value={password}
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs focus:border-none "
              />
            </label>
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary mx-auto"
              onClick={isloginform ? handleLogin : handlesignup}
            >
              {isloginform ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className=" text-center cursor-pointer"
            onClick={() => setisloginform((v) => !v)}
          >
            {isloginform
              ? "New User? Signup here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
