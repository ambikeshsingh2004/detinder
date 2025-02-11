import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addConnections } from "./utils/connectionSlice";
import { Link } from "react-router-dom";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:4444/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections found</h1>;
  return (
    connections && (
      <>
        <div className="text-center my-4 overflow-scroll">
          <h1 className="text-bold text-white text-3xl">Connections</h1>
          {connections.map((c, i) => {
            const { firstname, lastname, photourl, age, gender, about, _id } =
              c;
            return (
              <div
                key={i}
                className="flex m-4 p-2 rounded-lg bg-base-300 w-1/2 mx-auto items-center"
              >
                <img
                  src={photourl}
                  className="w-40 h-40 aspect-square rounded-md"
                />
                <h1 className="text-center ml-40">
                  {firstname + " " + lastname}
                </h1>
                {/* <p>{about}</p> */}
                <Link to={"/chat/" + _id}>
                  <button className="bg-red-500 p-2 px-6 rounded-md ml-16">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    )
  );
};

export default Connections;
