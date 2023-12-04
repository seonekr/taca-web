import "./account.css";
import { FaAngleLeft } from "react-icons/fa6";
import React, { useState } from "react";
import user from "../../../img/user.png";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { Link } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState([]);
  const [name, setName] = useState("");

  // This is submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Set default email if empty
    const submittedEmail = email.trim() || "example@gmail.com"; // Inside '' fatch email from datadase for set old email when user doesn't type a new email

    // Set default phone if empty
    const submittedPhone = phone || "02099887878"; // Inside '' fatch phone number from datadase for set old phone number when user doesn't  type a new phone number

    // Set default name if empty
    const submittedName = name.trim() || "Sam"; // fatch name from datadase for set old name when user doesn't type a new name
    // Set default image if empty
    //const submittedProfile = profile || {user}; // Inside { } fatch image from datadase for set old image when user doesn't choose image

    const submittedProfile = profile.length > 0 ? profile[0].name : user;
    const submittedProfileName = submittedProfile
      .split("\\")
      .pop()
      .split("/")
      .pop();

    console.log("Form Data:", {
      // Here you can insert informatio to database
      email: submittedEmail,
      phone: submittedPhone,
      profile: submittedProfileName,
      name: submittedName,
    });

    setEmail(""), setPhone(""), setName(""), setProfile([]);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  // Get name from user
  const handleName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  // Previw image before submit
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfile([file]);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Header />

      <section id="account">
        <div className="account_navbarr">
          <div className="header_boxBack">
            <Link to="/account" className="guopIconbAck">
              <FaAngleLeft className="iconnBack" />
              Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="personal-info">
          <div className="contact-info">
            <div className="box-image">
              {profile && profile.length > 0 ? (
                <span>
                  <img src={URL.createObjectURL(profile[0])} alt="" />
                </span>
              ) : (
                <span>
                  <img src={user} alt="" />
                </span>
              )}
              <input id="choose-image" type="file" onChange={handleImage} />
              <label htmlFor="choose-image">Edit</label>
            </div>
            <div className="contact">
              <label htmlFor="name">Change name:</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Your name here"
                onChange={handleName}
              />
            </div>
            <div className="contact">
              <label htmlFor="email">Change email:</label>
              <input
                type="email"
                id="email"
                placeholder="...@example.com"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="contact">
              <label htmlFor="phone">Change phone:</label>
              <input
                type="text"
                id="phone"
                placeholder=".....9972"
                value={phone}
                onChange={handlePhone}
              />
            </div>
          </div>
          <div className="submit">
            <div className="save">
              <button
                type="submit"
                disabled={
                  !email &&
                  !phone &&
                  !name &&
                  (!profile || profile.length === 0)
                }
              >
                Done
              </button>
              {/* {(email || phone) && (<button type="submit">Done</button>)} The button will show when user input information */}
            </div>
          </div>
        </form>
      </section>
      <Menu />
    </>
  );
};

export default Contact;
