import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFeed } from "./utils/feedSlice";
import Card from "./Card";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get("http://localhost:4444/feed", {
        withCredentials: true,
      });
      // axios automatically parses data into js object
      dispatch(addFeed(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length == 0) return <h1>No New users found</h1>;
  return (
    feed && (
      <div className="flex justify-center">
        <Card user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
