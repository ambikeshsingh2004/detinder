import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [sb, setsb] = useState(true);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4444/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const reviewRequest = async (status, _id) => {
    console.log("i was called");
    try {
      const res = await axios.post(
        "http://localhost:4444/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!requests) fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-center min-h-[512px]">No Requests found</h1>;
  return (
    requests && (
      <div>
        <>
          <div className="text-center my-10 min-h-[400px]">
            <h1 className="text-bold text-white text-3xl">Requests</h1>
            {requests.map((c, i) => {
              const { _id, firstname, lastname, photourl, age, gender, about } =
                c.fromuserid;
              return (
                <div
                  key={i}
                  className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
                >
                  <img
                    src={photourl}
                    className="w-40 h-40 aspect-square rounded-md"
                  />
                  <h1 className="text-center ml-40">
                    {firstname + " " + lastname}
                  </h1>
                  <div className="ml-30 flex">
                    <button
                      className="btn btn-primary w-30"
                      onClick={() => reviewRequest("rejected", c._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary ml-5 w-30 
                    "
                      onClick={() => reviewRequest("accepted", c._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      </div>
    )
  );
};

export default Requests;
