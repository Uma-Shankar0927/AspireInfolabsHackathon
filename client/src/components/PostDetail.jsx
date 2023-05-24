import React, { useEffect, useState } from "react";
import loadingGif from "../assets/loadingGif.gif";
import { useParams, useNavigate } from "react-router-dom";
import LatestComments from "./LatestComments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetail = () => {
  const navigate = useNavigate();
  const [postdata, setPostdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setCurrentUser(email);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const deleteOrNot = () => {
    let foo = prompt(`Type "book" to delete!`);
    if (foo === "book") {
      deletePost();
    } else {
      toast.warning("Type Correct to delete!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const deletePost = async () => {
    try {
      const respose = await fetch(`http://localhost:8080/post/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (respose.ok) {
        await respose.json();
        navigate("/Home");
      }
    } catch (error) {
      alert("Error occured white deleting post!");
    }
  };

  const fetchPosts = async () => {
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
        setPostdata(result.data);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [id]);

  return (
    <div className="backCl">
      {postdata && (
        <div className="mainPost-detail">
          <div className="rowumrtwo">
            <div className="pdimage-div">
              <img src={postdata[0]?.image} alt="" />
            </div>
            <div className="post-contents">
              <div className="pcontent1">
                <h2>{postdata[0]?.title}</h2>
                <hr className="lineH" />
                <p>
                  {"postId " + "#"}
                  <span className="cppw">{id}</span>
                </p>
                <hr className="lineH" />
              </div>
              <div className="pcontent4">
                <p className="p4pDes">Description: </p>
                <p className="cppw">
                  {postdata[0]?.description.length > 300
                    ? postdata[0]?.description.slice(0, 300) + "..."
                    : postdata[0]?.description}
                </p>
              </div>
              {currentUser === postdata[0]?.email && (
                <div className="postedUr">
                  <h3>You posted this!</h3>
                  <div className="ownwe-postdiv">
                    <button
                      className="btn-buy"
                      onClick={() => navigate(`/UpdateForm/${id}`)}
                    >
                      Edit
                    </button>
                    <button className="btn-buy" onClick={() => deleteOrNot(id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <LatestComments id={id}/> */}
        </div>
      )}
      {postdata === null && (
        <div className="loadingGiff">
          <img src={loadingGif} alt="" />
        </div>
      )}
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default PostDetail;
