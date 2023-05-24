import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/loadingGif.gif";

const HomeForm = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    image: "",
    title: "",
    description: ""
  });

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/post/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setFormdata({
            email: result.data[0].email,
            image: result.data[0].image,
            title: result.data[0].title,
            description: result.data[0].description,
        });
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, image, title,description} = formdata;
    if (email && image && title && description) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/post/update/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            image: image,
            title: title,
            description: description
          }),
        });
        await response.json();
        alert("post Updated!");
        navigate("/Home");
      } catch (err) {
        alert(err);
      }finally{
        setLoading(false);
      }
    } else {
      toast.warn("fill all details with valid credentials!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="mainHomeForm">
      <div className="homeform">
        <h3>Update a post:</h3>
        <input
          placeholder="image link"
          type="text"
          name="image"
          id=""
          value={formdata.image}
          onChange={handleChange}
        />
        <input
          placeholder="book title"
          type="text"
          name="title"
          id=""
          value={formdata.title}
          onChange={handleChange}
        />
        <input
          placeholder="description"
          type="text"
          name="description"
          id=""
          value={formdata.description}
          onChange={handleChange}
        />
        {loading ? (
          <img src={loadingGif} alt="" />
        ) : (
          <button className="btn-homeForm" onClick={handleSubmit} >
            Submit
          </button>
        )}
        <button className="btn-homeForm" onClick={() => navigate("/Home")}>
          Back
        </button>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default HomeForm;
