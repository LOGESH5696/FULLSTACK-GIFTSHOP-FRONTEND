import React, { useRef, useState } from "react";
import EmbeddedMap from './../pages/EmbeddedMap';
import emailjs from "@emailjs/browser";
import styled from "styled-components";

// npm i @emailjs/browser

const SupportPage = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qmmw4c8",
        "template_dk0z3zo",
        form.current,
        "3MI9mOWo7yi_KGHII"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    <StyledContactForm>
      <div className="punchline">Exceptional Gifts, Unmatched Support—We're Here for You 24/7!</div>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
        />
        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>

    <EmbeddedMap/>
    </>
  );
};

export default SupportPage;

const StyledContactForm = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #03346E;
  font-family: 'Montserrat', sans-serif;

  .punchline {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  form {
    background-color: #fff;
    padding: 50px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    max-width: 90%;
    margin: 0 auto;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
    }

    input[type="text"],
    input[type="email"],
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    }

    input[type="submit"] {
      background-color: #4CAF50;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;

      &:hover {
        background-color: #3e8e41;
      }
    }
  }
`;
