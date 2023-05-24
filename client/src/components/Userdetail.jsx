import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import loadingForm from "../assets/loadingForm.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import crownicon from '../assets/crownicon.png'

const Userdetail = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [userPoint, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valueChange, setValueChange] = useState(false);
  const [dateCheck, setDateCheck] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [bmi,setBmi] = useState();
  const [winner, setWinner] = useState('');
  const [tasksResult, setTaskResult] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
  });

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    const bmi = JSON.parse(localStorage.getItem("bmi"));
    if (email) {
      setUserName(email.split("@")[0]);
      setCurrentUser(email);
      setBmi(bmi);
    } else {
      navigate("/");
    }
  }, []);

  const logoutFunc = () => {
    localStorage.clear();
    navigate("/");
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/userpoint", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllUsers(result.data);
      }
    } catch (error) {
      alert("Error occured while fetching Users!");
    }
  };
  useEffect(() => {
    getAllUsers();
    allUsers.sort((a, b) => (a.points > b.points ? 1 : -1));
  }, [currentUser]);

  const getUserPoint = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `http://localhost:8080/userpoint/${currentUser}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          if (result.data?.length !== 0) {
            setUserPoints(result.data[0].points);
            setDateCheck(result.data[0].lastDay);
          }
        }
      } catch (error) {
        alert("Error occured while fetching points!");
      }
    }
  };
  useEffect(() => {
    getUserPoint();
  }, [currentUser]);
  useEffect(() => {
    getUserPoint();
  }, [valueChange]);

  const handlePoints = async () => {
    if (
      currentUser &&
      tasksResult.task1 === true &&
      tasksResult.task2 === true &&
      tasksResult.task3 === true &&
      tasksResult.task4 === true &&
      tasksResult.task5 === true
    ) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/userpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser,
            points: userPoint,
            lastDay: new Date().toLocaleString("en-US", { day: "2-digit" }),
          }),
        });
        if (response.ok) {
          await response.json();
          setValueChange(!valueChange);
        }
      } catch (error) {
        alert("Error occured!");
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Complete Tasks!", {
        pauseOnHover: false,
        autoClose: 2000,
        theme: "dark",
      });
    }
  };
  return (
    <div className="mainUserdetail">
      <div className="image-contain">
        <img src="https://source.unsplash.com/1600x900/?mountains" alt="" />
        <div className="logoutBtn" onClick={logoutFunc}>
          <img src={logout} alt="" />
          <p className="lgtUP">Logout</p>
        </div>
      </div>
      <div className="userProName">
        <div className="userpro">{userName?.charAt(0).toUpperCase()}</div>
        <div className="userN">{userName}</div>
      </div>
      <div className="main-leaderboard">
        <div className="points">
          Your Points : <span className="spanPoints">{userPoint}</span>
        </div>
        <div className="leaderboard">
          <h3>Recent LeaderBoard</h3>
          <div className="leaderBox">
            {allUsers?.map((item) => (
              <div key={item._id} className="itemLeader">
                <span>{item.email?.split("@")[0]}</span>
                <span>{item.points}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tasks">
          <h2 style={{ marginBottom: "12px" }}>Your Daily Tasks:</h2>
          <div className="task1 task">
            Drink 3 litres Water
            <input
              type="checkbox"
              name="task1"
              value={tasksResult.task1}
              onClick={() =>
                setTaskResult({ ...tasksResult, task1: !tasksResult.task1 })
              }
            />
          </div>
          <div className="task2 task">
            Exercise
            <input
              type="checkbox"
              name="task2"
              value={tasksResult.task2}
              onClick={() =>
                setTaskResult({ ...tasksResult, task2: !tasksResult.task2 })
              }
            />
          </div>
          <div className="task3 task">
            Reading Book
            <input
              type="checkbox"
              name="task3"
              value={tasksResult.task3}
              onClick={() =>
                setTaskResult({ ...tasksResult, task3: !tasksResult.task3 })
              }
            />
          </div>
          <div className="task4 task">
            screen time less than 2 hours
            <input
              type="checkbox"
              name="task4"
              value={tasksResult.task4}
              onClick={() =>
                setTaskResult({ ...tasksResult, task4: !tasksResult.task4 })
              }
            />
          </div>
          <div className="task5 task">
            Complete Nutritional Diet
            <input
              type="checkbox"
              name="task5"
              value={tasksResult.task5}
              onClick={() =>
                setTaskResult({ ...tasksResult, task5: !tasksResult.task5 })
              }
            />
          </div>
          {dateCheck !==
            new Date().toLocaleString("en-US", { day: "2-digit" }) &&
            loading && <img src={loadingForm} alt="" />}
          {dateCheck !==
            new Date().toLocaleString("en-US", { day: "2-digit" }) &&
            !loading && (
              <button
                onClick={handlePoints}
                style={{ marginTop: "20px" }}
                className="home-btn-1"
              >
                Submit
              </button>
            )}
          {dateCheck ===
            new Date().toLocaleString("en-US", { day: "2-digit" }) &&
            !loading && (
              <h3 style={{ color: "green" }}>
                Congrats! Today you Earned 20 Points!
              </h3>
            )}
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default Userdetail;
