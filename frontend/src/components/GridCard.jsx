import React, { useState } from "react";
import codeImg from "../images/code.png";
import delImg from "../images/delete.png";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

function GridCard({ item }) {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload();
        } else {
          alert(data.message);
          setIsDeleteModelShow(false);
        }
      });
  };

  return (
    <>
      <div className="gridCard bg-[#141414] p-[10px] w-[230px] h-[150px] rounded-lg shadow-lg shadow-black/50 mb-[30px] hover:bg-[#202020]">
        <div
          onClick={() => navigate(`/editor/${item._id}`)}
          className="cursor-pointer"
        >
          <img className="w-[65px]" src={codeImg} alt="" />
          <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-[14px] text-[gray]">
            Created in {new Date(item.date).toDateString()}
          </p>

          <img
            onClick={() => setIsDeleteModelShow(true)}
            className="w-[25px] cursor-pointer"
            src={delImg}
            alt=""
          />
        </div>
      </div>

      {isDeleteModelShow ? (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className="text-3xl">
              Do you want to delete <br />
              this project
            </h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={() => deleteProj(item._id)}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setIsDeleteModelShow(false);
                }}
                className="p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default GridCard;
