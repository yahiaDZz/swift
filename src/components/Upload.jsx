import React, { useState } from "react";
import upload from "../assets/upload.png";
import eks from "../assets/eks.png";
import plus from "../assets/plus.png";
const Upload = () => {
  const [fileList, setFileList] = useState([]);
  const [fileContent, setFileContent] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (!file.type.startsWith("application/pdf")) {
        alert("Only PDF files are allowed! Please select a PDF file.");
        event.target.value = null; // Clear the input field
        return; // Exit the function to prevent further processing
      }

      // If it's a PDF file, proceed with your logic here
      console.log("Valid PDF file selected:", file);
      // You can now process the valid PDF file further, such as storing it in state or sending it to a server
    }
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
  const maxLength = 20;
  const handleSubmit = () => {
    // TODO: Send files with content to the backend server
    // For demonstration purposes, log the data
    console.log("File Names:", fileList);
    console.log("File Content:", fileContent);

    localStorage.clear();
    localStorage.setItem("files", JSON.stringify(fileContent));
    // Reset state after submission
    setFileList([]);
    setFileContent([]);
    alert("Files Uploaded Successfully");
  };

  return (
    <div className="text-white pt-20 max-w-md mx-auto p-4 font-primary">
      {fileList.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Uploaded Files
          </h2>
          <ul className="space-y-2 ">
            {fileList.map((fileName) => (
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
            ))}
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
