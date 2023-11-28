import React from "react";
import "../css/profile.css";

export const Profile = () => {
  return (
    <div className="desktop">
      <div className="div">
        <div className="text-wrapper">culinary compass.</div>
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
        <div className="text-wrapper-8">Patrick Star</div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-9">Edit Profile</div>
          </div>
        </div>
        <div className="frame" />
        <div className="frame-2" />
        <div className="frame-3" />
        <img
          className="pexels-photo-by"
          alt="Pexels photo by"
          src="pexels-photo-by-lum3n.png"
        />
        <div className="overlap">
          <img className="search" alt="Search" src="search.png" />
          <div className="text-wrapper-10">what’s cooking?</div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
