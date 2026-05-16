import React, { useEffect, useState } from "react";
// import "./index.css";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import "./Navbar.css";
import { CiLight } from "react-icons/ci";
import { LuLayoutGrid } from "react-icons/lu";
import { api_base_url, toggleClass } from "../helper";

function Navbar() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId") || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className="w-[150px] cursor-pointer" src={logo} alt="logo" />
        </div>

        <div className="links flex items-center space-x-6">
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/about" className="links">
            About
          </Link>
          <Link to="/contact" className="links">
            Contact
          </Link>
          <Link to="/services" className="links">
            Services
          </Link>

          <button
            onClick={logout}
            className="btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600"
          >
            Logout
          </button>
        </div>

        <Avatar
          onClick={() => {
            toggleClass(".dropDownNavbar", "hidden");
          }}
          name={"Ananya KAPIL"}
          size="40"
          round={true}
          className="cursor-pointer ml-2"
        />
      </div>
      <div className="dropDownNavbar hidden absolute right-[60px] shadow-lg shadow-black/50 top-[80px] bg-[#1A1919] p-[10px] rounded-lg w-[140px] h-[110px]">
        <div className="py-[10px] border-b-[1px] border-b-[#fff]">
          <h3 className="text-[17px]" style={{ lineHeight: 1 }}>
            {data ? data.name : ""}
            Miss. Ananya kapil
          </h3>
        </div>
        <i
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <CiLight className="text-[20px]" />
          Toggle light mode
        </i>
        <i
          className="flex items-center gap-2 mt-3 mb-2 cursor-pointer"
          style={{ fontStyle: "normal" }}
        >
          <LuLayoutGrid className="text-[20px]" />
          Grid layout
        </i>
      </div>
    </>
  );
}

export default Navbar;
