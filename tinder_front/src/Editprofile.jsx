import React, { useEffect, useState } from "react";
import Card from "./Card";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const Editprofile = ({ user }) => {
  const [firstname, setfirstname] = useState(user.firstname);
  const [lastname, setlastname] = useState(user.lastname);
  const [age, setage] = useState(user.age || " ");
  const [about, setabout] = useState(user.about || " ");
  const [gender, setgender] = useState(user.gender || " ");
  const [photourl, setphotourl] = useState(user.photourl);
  //const userr = { firstname, lastname, age, about, gender, photourl };
  const dispatch = useDispatch();
  //const [boo, setboo] = useState(true);
  const saveprofile = async () => {
    console.log("save profile was called from frontend");
    try {
      const res = await axios.patch(
        "http://localhost:4444/profile/edit",
        { firstname, lastname, age, photourl, about, gender },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  // useEffect(()=>{
  //   const user = useSelector((store)=>store.user);
  // },[])
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="flex justify-center items-center my-20 ">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-4">
                <div className="label">
                  <span className="label-text">First Name</span>
                  {/* {emailIdjbjbej} */}
                </div>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  className="input input-bordered w-full max-w-xs  focus:border-none"
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5">
                <div className="label mt-5">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  value={lastname}
                  type="text"
                  onChange={(e) => setlastname(e.target.value)}
                  className="input input-bordered w-full max-w-xs focus:border-none "
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5">
                <div className="label mt-5">
                  <span className="label-text">Age</span>
                </div>
                <input
                  value={age}
                  type="number"
                  onChange={(e) => setage(e.target.value)}
                  className="input input-bordered w-full max-w-xs focus:border-none "
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5">
                <div className="label mt-5">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  value={gender}
                  type="text"
                  onChange={(e) => setgender(e.target.value)}
                  className="input input-bordered w-full max-w-xs focus:border-none "
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5">
                <div className="label mt-5">
                  <span className="label-text">About</span>
                </div>
                <input
                  value={about}
                  type="text"
                  onChange={(e) => setabout(e.target.value)}
                  className="input input-bordered w-full max-w-xs focus:border-none "
                />
              </label>
              <label className="form-control w-full max-w-xs mt-5">
                <div className="label mt-5">
                  <span className="label-text">Photourl</span>
                </div>
                <input
                  value={photourl}
                  type="text"
                  onChange={(e) => setphotourl(e.target.value)}
                  className="input input-bordered w-full max-w-xs focus:border-none "
                />
              </label>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary mx-auto" onClick={saveprofile}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Card user={{ firstname, lastname, age, photourl, about, gender }} />
    </div>
  );
};

export default Editprofile;
