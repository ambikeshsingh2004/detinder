import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
const Chat = () => {
  const { targetuserid } = useParams();
  const [message, setmessage] = useState([]);
  const [newmessage, setnewmessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  useEffect(() => {
    //as soon as this page is rendered  when we create socket we must also disconnect socket
    // we must never have unnecessary open sockets
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      targetuserid,
      userId,
      lastname: user.lastname,
      firstname: user.firstname,
    });
    socket.on("messageReceived", ({ firstname, text, lastname }) => {
      //console.log(firstname, text);
      //setmessage([...message, { firstname, text }]);
      setmessage((message) => [...message, { firstname, text, lastname }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetuserid]);
  console.log(targetuserid);
  const sendmessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstname: user.firstname,
      userId,
      targetuserid,
      text: newmessage,
    });
    setnewmessage("");
  };
  const fetchchatmessage = async () => {
    const chat = await axios.get("http://localhost:4444/chat/" + targetuserid, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatmessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstname: senderId?.firstname,
        lastname: senderId?.lastname,
        text,
      };
    });
    setmessage(chatmessages);
  };
  useEffect(() => {
    fetchchatmessage();
  }, []);
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="text-center border-gray-600">Chat</h1>
      <div className="h-[40vh] overflow-scroll">
        {/* here we wll show messages */}
        {/* here we will send messages */}
        {message.map((mess, ind) => {
          return (
            <div
              key={ind}
              className={
                "chat " +
                (user?.firstname === mess?.firstname
                  ? "chat-end"
                  : "chat-start")
              }
            >
              <div className="chat-header">
                {mess.firstname + " " + mess.lastname}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{mess.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 flex  border-gray-300 border-none w-full items-center gap-5">
        <input
          value={newmessage}
          onChange={(e) => setnewmessage(e.target.value)}
          className="flex-1 border border-purple-500 mr-2 h-4 py-6 rounded"
        ></input>
        <button
          onClick={sendmessage}
          className="px-10 py-4 mx-10 bg-red-400 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
