import React, { useEffect, useState } from "react";
import upload from "../assets/upload.png";
import eks from "../assets/eks.png";
import plus from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";
import Cookies from "js-cookie";

const Upload = ({ isAdmin }) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);

  const [fileList, setFileList] = useState([]);
  const [fileContent, setFileContent] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files; // list of elements: element[i] = {name, content}
    console.log("Selected files:", selectedFiles);
    const newFileList = Array.from(selectedFiles).map((file) => file.name); // element[i] = {name}
    const uniqueFileList = Array.from(new Set([...fileList, ...newFileList])); // unique elements with name only

    // Update file list state
    setFileList(uniqueFileList); // with names only , without the content
    // Read content of each file
    const fileContentArray = await Promise.all(
      Array.from(selectedFiles).map((file) => readFileContent(file))
    );
    const getFromSelectedFiles = (name) => {
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i].name === name) {
          return selectedFiles[i];
        }
      }
      return null;
    };
    // Combine file names and content
    const updatedFileContent = uniqueFileList.map((name, index) => ({
      name,
      file: getFromSelectedFiles(name),
    }));

    // Update file content state
    setFileContent(updatedFileContent);
    console.log("FILE CONTENT:", fileContent);
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };
  const handleDelete = (fileName) => {
    const updatedFileList = fileList.filter((name) => name !== fileName);
    const updatedFileContent = fileContent.filter(
      (file) => file.name !== fileName
    );

    setFileList(updatedFileList);
    setFileContent(updatedFileContent);
  };
  const handleSubmit = async () => {
    // For demonstration purposes, log the data
    for (let i = 0; i < fileContent.length; i++) {
      const contentBlob = new Blob([fileContent[i].content], {
        type: "application/pdf",
      });
      console.log("FILE CONTENT:", contentBlob);
      const formData = new FormData();
      formData.append("pdf", fileContent[i].file, fileContent[i].name);

      console.log("Uploading:", fileContent[i].name);
      await axios
        .post("http://127.0.0.1:8000/api/articles/", formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
          alert("Error Uploading Files! Check console");
        });
    }

    // Reset state after submission
    setFileList([]);
    setFileContent([]);
  };
  const maxLength = 20;
  return (
    <div className="text-white pt-20 max-w-md mx-auto p-4 font-primary">
      {fileList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Files to upload
          </h2>
          <ul className="space-y-2 ">
            {fileList.length > 0 ? (
              fileList.map((fileName) => (
                <div key={fileName} className="flex justify-between">
                  <li className="font-bold">
                    {fileName.length > maxLength
                      ? fileName.substring(0, maxLength) + "..."
                      : fileName}
                  </li>
                  <button
                    onClick={() => {
                      handleDelete(fileName);
                    }}
                    className="flex items-center justify-center  space-x-2 px-4 py-2 text-white rounded-md bg-red-500"
                  >
                    <img src={eks} />
                    <h1>Delete</h1>
                  </button>
                </div>
              ))
            ) : (
              <>Empty</>
            )}
          </ul>
        </div>
      )}
      <div className="flex flex-col text-center mt-10 ">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          multiple
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center space-x-2 cursor-pointer bg-[#90C5FF] text-black py-2 px-4 rounded-lg"
        >
          <img src={plus} className="w-5 h-5" />
          <h1 className="font-bold ">Add Files</h1>
        </label>
        {fileList.length > 0 && (
          <button
            onClick={() => handleSubmit()}
            className="mt-4 bg-primary font-bold text-white py-2 px-4 rounded-full"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;
