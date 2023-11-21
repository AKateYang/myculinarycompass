import React from "react";
import "./css/user.css";

export const User = () => {
  return (
    <div className="desktop">
      <div className="div">
        <div className="text-wrapper">culinary compass.</div>
        <img className="search" alt="Search" src="search.png" />
        <img className="light-mode" alt="Light mode" src="light-mode.png" />
        <img className="chat" alt="Chat" src="chat.png" />
        <img
          className="notifications"
          alt="Notifications"
          src="notifications.png"
        />
        <img className="help" alt="Help" src="help.png" />
        <div className="ellipse" />
        <div className="group">
          <div className="text-wrapper-2">3</div>
          <div className="text-wrapper-3">Posts</div>
          <div className="text-wrapper-4">79</div>
          <div className="text-wrapper-5">Followers</div>
          <div className="text-wrapper-6">262</div>
          <div className="text-wrapper-7">Following</div>
        </div>
        <div className="text-wrapper-8">John Something</div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-9">Edit Profile</div>
          </div>
        </div>
        <div className="frame" />
        <div className="frame-2" />
        <div className="frame-3" />
        <div className="frame-4" />
      </div>
    </div>
  );
};
export default User;
