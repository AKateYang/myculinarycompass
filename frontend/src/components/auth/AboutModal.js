import React from "react";
import "../css/aboutModal.css";

const AboutModal = ({ isOpen, onClose, className }) => {
  if (!isOpen) return null;

  // Handle background click to close the modal
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      // Check if clicked element is the background
      onClose();
    }
  };

  return (
    <div className={`modal ${className}`} onClick={handleBackgroundClick}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="about-box">
          <div className="tagline">the Team.</div>
          <p className="description">
            We can put a short description of who we are and about the website.
          </p>
          <div className="text-wrapper-4">Ashley</div>
          <p className="p">Project Manager / Frontend Developer</p>
          <div className="text-wrapper-5">Database Developer</div>
          <div className="text-wrapper-6">Frontend Developer</div>
          <div className="overlap">
            <div className="text-wrapper-7">
              Application Programming Interface
            </div>
            <div className="text-wrapper-8">Ahal</div>
          </div>
          <div className="text-wrapper-9">
            Application Programming Interface
          </div>
          <div className="text-wrapper-10">Frontend Developer</div>
          <div className="text-wrapper-11">Alissa</div>
          <div className="text-wrapper-12">Gabe</div>
          <div className="text-wrapper-13">Naomi</div>
          <div className="text-wrapper-14">Serina</div>
          <p className="github-https-github">
            <span className="span">Github:</span>
            <span className="text-wrapper-15">&nbsp;</span>
            <span className="text-wrapper-16">
              https://github.com/Ahal122/COP4331CLargeProjectWeb
              <br />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;

/*
import React from "react";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <div className="div">
        <div className="navigation">
          <div className="text-wrapper">Login</div>
          <div className="text-wrapper-2">Sign-Up</div>
          <div className="text-wrapper-3">About Us</div>
        </div>
        <div className="overlap-group">
          <div className="tagline">the Team.</div>
          <p className="description">We can put a short description of who we are and about the website.</p>
          <div className="text-wrapper-4">Ashley</div>
          <p className="p">Project Manager / Frontend Developer</p>
          <div className="text-wrapper-5">Database Developer</div>
          <div className="text-wrapper-6">Frontend Developer</div>
          <div className="overlap">
            <div className="text-wrapper-7">Application Programming Interface</div>
            <div className="text-wrapper-8">Ahal</div>
          </div>
          <div className="text-wrapper-9">Application Programming Interface</div>
          <div className="text-wrapper-10">Frontend Developer</div>
          <div className="text-wrapper-11">Alissa</div>
          <div className="text-wrapper-12">Gabe</div>
          <div className="text-wrapper-13">Naomi</div>
          <div className="text-wrapper-14">Serina</div>
          <p className="github-https-github">
            <span className="span">Github:</span>
            <span className="text-wrapper-15">&nbsp;</span>
            <span className="text-wrapper-16">
              https://github.com/Ahal122/COP4331CLargeProjectWeb
              <br />
            </span>
          </p>
        </div>
        <div className="title">culinary compass.</div>
      </div>
    </div>
  );
};
*/
