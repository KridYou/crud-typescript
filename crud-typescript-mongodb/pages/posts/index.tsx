import React, { useState } from "react";
import Layout from "../../components/Layout";

function index() {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name && detail) {
      try {
        let response = await fetch("http://localhost:3000/api/addPost", {
          method: "POST",
          body: JSON.stringify({
            name,
            detail,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();

        setName("");
        setDetail("");
        setError("");
        setMessage("Post added successfully!");
      } catch (errorMessage: any) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required!");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form">
        {error ? <div className="alert-error">{error}</div> : null}
        {message ? <div className="alert-message">{message}</div> : null}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Detail</label>
          <textarea
            name="detail"
            placeholder="Detail of the patience"
            cols={20}
            rows={8}
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit_btn">
            Add
          </button>
        </div>
      </form>

      <style jsx>
        {`
          .form {
            width: 400px;
            margin: 10px auto;
          }

          .form-group {
            width: 100%;
            margin-bottom: 10px;
            display: block;
          }

          .form-group label {
            display: block;
            margin-bottom: 10px;
          }

          .form-group input[type="text"],
          .form-group textarea {
            padding: 10px;
            width: 100%;
          }

          .alert-error {
            width: 100%;
            color: red;
            margin-bottom: 10px;
          }

          .alert-message {
            width: 100%;
            color: green;
            margin-bottom: 10px;
          }
        `}
      </style>
    </Layout>
  );
}

export default index;
