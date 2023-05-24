import React, { useState } from "react";
import loadingForm from "../assets/loadingForm.gif";
import { useParams ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState({
    height: "",
    weight: "",
    age: "",
    desiese: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {height,weight,age,desiese} = userData;
    if (id && height && weight && age && desiese) {
      setloading(true);
      const bmi = parseInt(userData.weight)/(Math.pow(parseFloat(userData.height),2));
      localStorage.setItem('bmi', JSON.stringify(bmi));
      try {
        const response = await fetch("http://localhost:8080/userDetail/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: id,
            height: height,
            age: age,
            weight: weight,
            bmi: bmi,
            desiese: desiese,
          }),
        });
        await response.json();
        alert("post created!");
        navigate("/Home");
      } catch (err) {
        alert(err);
      } finally {
        setloading(false);
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
    <div className="userData-main">
      <h3>Enter valid details:</h3>
      <div className="formUD">
        <input
          placeholder="Your height in meters"
          type="text"
          name="height"
          id=""
          value={userData.height}
          onChange={(e) => setUserData({ ...userData, height: e.target.value })}
        />
        <input
          placeholder="Your weight in Kg"
          type="text"
          name="weight"
          id=""
          value={userData.weight}
          onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
        />
        <input
          placeholder="Your age in number"
          type="text"
          name="age"
          id=""
          value={userData.age}
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
        />
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) =>
            setUserData({ ...userData, desiese: e.target.value })
          }
        >
          <option value="DEFAULT" disabled>
            Have any desiese...
          </option>
          <option value="Diabetes">Diabetes</option>
          <option value="Blood Pressure">Blood Pressure</option>
          <option value="Asthma">Asthma</option>
          <option value="Cold and Flu">Cold and Flu</option>
          <option value="Migrane">Migrane</option>
        </select>
        {loading===false && <button onClick={handleSubmit} className="submitbtn">Submit</button>}
        {loading===true && <img src={loadingForm} alt="" /> }
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </div>
  );
};

export default UserData;
