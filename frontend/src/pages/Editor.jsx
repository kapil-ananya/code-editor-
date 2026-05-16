import React, { useEffect, useState } from "react";
import EditorNavbar from "../components/EditorNavbar";
import Editor from "@monaco-editor/react";
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const CodeEditor = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setisExpanded] = useState(false);

  const [htmlCode, setHtmlCode] = useState("<h1>Hello Ananya</h1>");
  const [cssCode, setCssCode] = useState("body {background-color: #F4F4F4; }");
  const [jsCode, setJsCode] = useState("// some comment");

  const { projectId } = useParams();

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}<\/script>`;

    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      run();
    }, 200);
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA 👉", data);
        if (data?.project) {
          setHtmlCode(data.project.htmlCode || "");
          setCssCode(data.project.cssCode || "");
          setJsCode(data.project.jsCode || "");
        } else {
          console.log("Project not found or deleted");
        }
      });
  }, [projectId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectId,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("something went wrong");
            }
          })
          .catch((err) => {
            console.log("Error saving project", err);
            alert("Faild to save project");
          });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [htmlCode, cssCode, jsCode, projectId]);

  return (
    <>
      <EditorNavbar />

      <div className="flex">
        <div className="left" style={{ width: isExpanded ? "100%" : "50%" }}>
          <div className="tabs flex items-center justify-center gap-4 w-full bg-[#1A1919] h-[50px] px-[2px]">
            <div className="tab flex items-center gap-6 p-[5px]">
              <div
                onClick={() => setTab("html")}
                className="p-[6px] cursor-pointer bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                HTML
              </div>
              <div
                onClick={() => setTab("css")}
                className="p-[6px] cursor-pointer bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                CSS
              </div>
              <div
                onClick={() => setTab("js")}
                className="p-[6px] cursor-pointer bg-[#1E1E1E] px-[10px] text-[15px] text-white"
              >
                JavaScript
              </div>
            </div>

            <div className="flex items-center gap-3">
              <i className="text-[20px] cursor-pointer" onClick={toggleTheme}>
                <MdLightMode />
              </i>
              <i
                className="text-[20px] cursor-pointer"
                onClick={() => setisExpanded(!isExpanded)}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>

          {tab === "html" ? (
            <Editor
              onChange={(value) => setHtmlCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="html"
              value={htmlCode}
            />
          ) : tab === "css" ? (
            <Editor
              onChange={(value) => setCssCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="css"
              value={cssCode}
            />
          ) : (
            <Editor
              onChange={(value) => setJsCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
              language="javascript"
              value={jsCode}
            />
          )}
        </div>

        <iframe
          id="iframe"
          style={{ width: isExpanded ? "0%" : "50%" }}
          className={`${isExpanded ? "hidden" : ""} min-h-[82vh] bg-white`}
        ></iframe>
      </div>
    </>
  );
};

export default CodeEditor;
