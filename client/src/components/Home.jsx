import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loadingGif from "../assets/loadingGif.gif";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import notfound from "../assets/notfound.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [postDelete, setPostDelete] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const deleteOrNot = (_id) => {
    let foo = prompt(`Type "post" to delete!`);
    if (foo === "post") {
      deletePost(_id);
    } else if (foo) {
      toast.warning("Type Correct to delete!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email) {
      setCurrentUserEmail(email);
    } else {
      navigate("/");
    }
  }, []);

  const navigateFunc = () => {
    navigate(`/HomeForm/${"create"}`);
  };
  const deletePost = async (_id) => {
    try {
      const respose = await fetch(`http://localhost:8080/post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id }),
      });
      if (respose.ok) {
        await respose.json();
        setPostDelete(!postDelete);
        toast.success("Post deleted!", {
          pauseOnHover: false,
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      alert("Error occured white deleting post!");
    }
  };
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [postDelete]);
  useEffect(() => {
    fetchPosts();
  }, [postEdit]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const filterBooks = allPosts?.filter((post) =>
      post.title.toLowerCase().includes(searchterm.toLowerCase())
    );
    setFilteredItems(filterBooks);
  }, [searchterm]);
  return (
    <div className="main-home">
      <div className="HomeUdiv">
        <div className="home-btns">
          <button onClick={navigateFunc} className="home-btn-1">
            Create Post
          </button>
        </div>
        <div className="search-box12">
          <input
            id="searchIn"
            placeholder="search posts..."
            type="text"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="postsdiv">
        {loading ? (
          <img src={loadingGif} alt="" />
        ) : (
          <>
            {!searchterm &&
              allPosts?.length !== 0 &&
              allPosts?.map((post) => (
                <div key={post._id} className="card">
                  <div className="imgdiv">
                    <img src={post?.image} alt="book-image" />
                  </div>
                  <div className="card-contents">
                    <h3>
                      {post?.title?.length > 20
                        ? post?.title.slice(0, 20) + "..."
                        : post?.title}
                    </h3>
                    <p>{post?.description.slice(0, 20) + "..."}</p>
                    <div className="eddel-btns">
                      {currentUserEmail === post?.email && (
                        <img
                          src={editIcon}
                          onClick={() => navigate(`/UpdateForm/${post._id}`)}
                          alt=""
                        />
                        // <button
                        //   onClick={() => navigate(`/UpdateForm/${post._id}`)}
                        //   className="edit-del-btn"
                        // >
                        //   Edit
                        // </button>
                      )}
                      <button
                        className="knowmore"
                        onClick={() => navigate(`/postdetail/${post._id}`)}
                      >
                        Know more
                      </button>
                      {currentUserEmail === post?.email && (
                        <img
                          className=""
                          onClick={() => deleteOrNot(post?._id)}
                          src={deleteIcon}
                          alt=""
                        />
                        // <button
                        //   onClick={() => deleteOrNot(post?._id)}
                        //   className="edit-del-btn"
                        // >
                        //   Delete
                        // </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {searchterm &&
              filteredItems?.map((post) => (
                <div key={post._id} className="card">
                  <div className="imgdiv">
                    <img src={post?.image} alt="book-image" />
                  </div>
                  <div className="card-contents">
                    <h3>
                      {post?.title?.length > 20
                        ? post?.title.slice(0, 20) + "..."
                        : post?.title}
                    </h3>
                    <p>{post?.description.slice(0, 20) + "..."}</p>
                    <div className="eddel-btns">
                      {currentUserEmail === post?.email && (
                        <img
                          src={editIcon}
                          onClick={() => navigate(`/update/${post._id}`)}
                          alt=""
                        />
                        // <button
                        //   onClick={() => navigate(`/UpdateForm/${post._id}`)}
                        //   className="edit-del-btn"
                        // >
                        //   Edit
                        // </button>
                      )}
                      <button
                        className="knowmore"
                        onClick={() => navigate(`/postdetail/${post._id}`)}
                      >
                        Know more
                      </button>
                      {currentUserEmail === post?.email && (
                        <img
                          className=""
                          onClick={() => deleteOrNot(post?._id)}
                          src={deleteIcon}
                          alt=""
                        />
                        // <button
                        //   onClick={() => deleteOrNot(post?._id)}
                        //   className="edit-del-btn"
                        // >
                        //   Delete
                        // </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {!searchterm && allPosts?.length === 0 && (
              <div className="notfound">
                <img className="Himg" src={notfound} alt="" />
                <h2>No Posts available!</h2>
              </div>
            )}
            {searchterm && filteredItems?.length === 0 && (
              <div className="notfound">
                <img className="Himg" src={notfound} alt="" />
                <h2>No Posts available!</h2>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default Home;
