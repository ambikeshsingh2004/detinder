import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFeed } from "./utils/feedSlice";
const Card = ({ user }) => {
  const { _id, firstname, lastname, photourl, gender, age, about } = user;
  //const firstname = "ram";
  const dispatch = useDispatch();
  const handlesendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        "http://localhost:4444/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeFeed(userId));
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure>
        <img src={photourl} alt="Shoes" className=" rounded-md mt-0 max-h-60" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstname + " " + lastname}</h2>

        <p>{about}</p>
        {age && gender && <p>{age + ", " + gender}</p>}
        {/* {age && gender && <p>{age} + gender</p>} */}
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              handlesendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handlesendRequest("interested", _id);
            }}
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
