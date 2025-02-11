import { useState } from "react";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { ToastContainer } from "react-toastify";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import Premium from "./Premium";
import Chat from "./Chat";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetuserid" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </> //<Navbar />
  );
}

export default App;
