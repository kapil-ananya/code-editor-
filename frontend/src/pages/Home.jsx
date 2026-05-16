import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import GridCard from "../components/GridCard";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridLayout, setisGridLayout] = useState(false);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [data, setData] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const createProj = (e) => {
    if (projTitle.trim() === "") {
      alert("Please enter project title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            setProjTitle("");
            alert("Project Created Successfully");
            navigate("/editor/" + data.projectId);
          }
        });
    }
  };

  const getProject = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    }).then((res) =>
      res.json().then((data) => {
        if (data.success) {
          setData(data.projects);
        } else {
          setErr(data.msg);
        }
      }),
    );
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Navbar isGridLayout={isGridLayout} setisGridLayout={setisGridLayout} />

      <div className="flex items-center justify-between px-[100px] my-[40px]">
        <h2 className="text-2xl">Hi 👋, Ananya</h2>

        <div className="flex items-center gap-2">
          <div className="inputBox w-[350px]">
            <input
              type="text"
              placeholder="Search Here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setisGridLayout(!isGridLayout)}
            className="btnBlue mb-4 rounded-[5px] text-[20px] p-[8px]"
          >
            {isGridLayout ? "List" : "Grid"}
          </button>

          <button
            onClick={() => {
              console.log("clicked");
              setIsCreateModelShow(true);
            }}
            className="btnBlue rounded-[5px] text-[20px] p-[8px] z-[10]"
          >
            +
          </button>
        </div>
      </div>

      <div className="px-[100px]">
        {isGridLayout ? (
          // Grid Layout
          <div className="grid grid-cols-3 gap-4">
            {data
              ? data.map((item, index) => {
                  return <GridCard key={index} item={item} />;
                })
              : ""}

            {/* <GridCard />
            <GridCard />
            <GridCard /> */}
          </div>
        ) : (
          // List Layout
          <div className="flex flex-col gap-4">
            {data
              ? data.map((item, index) => {
                  return <ListCard key={index} item={item} />;
                })
              : ""}

            {/* <ListCard />
            <ListCard />
            <ListCard /> */}
          </div>
        )}
      </div>
      {isCreateModelShow && (
        <div className="model-overlay fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-[9999]">
          <div className="w-[25vw] min-h-[25vh] bg-[#141414] rounded-[10px] p-[20px] shadow-lg shadow-black/50">
            <h3 className="text-2xl mb-2">Create New Project</h3>

            <div className="inputBox !bg-[#202020] mb-4">
              <input
                onChange={(e) => {
                  setProjTitle(e.target.value);
                }}
                type="text"
                placeholder="Project Title"
                value={projTitle}
                className="mb-2"
              
              />
            </div>

            <div className="flex gap-3">
              <button onClick={createProj} className="btnBlue w-1/2">
                Create
              </button>

              <button
                onClick={() => setIsCreateModelShow(false)}
                className="btnBlue !bg-[#1A1919] w-1/2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
