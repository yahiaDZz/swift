import React, { useEffect, useState } from "react";
import upload from "../assets/upload.png";
import eks from "../assets/eks.png";
import plus from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import axios from "axios";

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
    const selectedFiles = event.target.files;

    const newFileList = Array.from(selectedFiles).map((file) => file.name);
    const uniqueFileList = Array.from(new Set([...fileList, ...newFileList]));

    // Update file list state
    setFileList(uniqueFileList);
    // Read content of each file
    const fileContentArray = await Promise.all(
      Array.from(selectedFiles).map((file) => readFileContent(file))
    );

    // Combine file names and content
    const updatedFileContent = uniqueFileList.map((name, index) => ({
      name,
      content: fileContentArray[index],
    }));

    // Update file content state
    setFileContent(updatedFileContent);
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
    // TODO: Send files with content to the backend server
    // For demonstration purposes, log the data
    for (let i = 0; i < fileContent.length; i++) {
      const info = {
        pdf: fileContent[i],
      };
      await axios
        .post("http://127.0.0.1:8000/api/articles", info, {
          headers: {
            Authorization: `Bearer ${Cookies.get("_auth")}`,
          },
        })
        .then((res) => {
          console.log("File uploaded successfully!");
        })
        .then((err) => {
          console.error(err);
          alert("Error Uploading Files! check console");
          window.location.reload();
        });
    }
    // Reset state after submission
    setFileList([]);
    setFileContent([]);
    alert("Files Uploaded Successfully");
  };
  const maxLength = 20;
  return (
    <div className="text-white pt-20 max-w-md mx-auto p-4 font-primary">
      {fileList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Uploaded Files
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
