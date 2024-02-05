import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const Signup = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true }); // Replace current entry in history
    }
  }, [isAuthenticated, navigate]);

  const [canSignup, setCanSignup] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordStrengthRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordStrengthRegex.test(e.target.value)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  };
  const handleSubmit = async (e) => {
    if (!usernameRegex.test(username)) {
      alert("Invalid username");
    } else if (!emailRegex.test(email)) {
      alert("Invalid email address");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      const information = {
        username: username,
        email: email,
        password: password,
        first_name: username,
        last_name: username,
      };
      console.log("INFORMATION:", information);
      await axios
        .post("http://127.0.0.1:8000/api/user/register/", {
          username: username,
          email: email,
          password: password,
          first_name: username,
          last_name: username,
        })
        .then((res) => {
          alert("User signup successfully!");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          alert("Could not signup user! check out console");
          // navigate("/");
        });
    }
  };
  return (
    <div className="bg-[url('../assets/google.png')] ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="bg-white p-6 space-y-4 md:space-y-6 sm:p-8 rounded-xl mt-10">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
              Create an account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  value={username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Johndoe123"
                  onChange={(e) => handleUsernameChange(e)}
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={(e) => handleEmailChange(e)}
                  required=""
                />
              </div>
              <div className="block mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    className="absolute bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => handlePasswordChange(e)}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:cursor-pointer absolute right-2 top-2 text-primary font-semibold underline"
                  >
                    {!showPassword ? "Show" : "Hide"}
                  </button>
                </div>
                <div
                  className={`text-sm lowercase font-bold text-gray-200 ${passwordStrength}`}
                >
                  Password Strength:{" "}
                  <span
                    className={`
                    ${
                      passwordStrength === "weak"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {passwordStrength}
                  </span>
                </div>
              </div>
              <div className="block mt-10">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2  text-sm font-medium text-black dark:text-white"
                >
                  Confirm password
                </label>
                <div></div>
                <div className="relative ">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={(e) => handleConfirmPasswordChange(e)}
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className=" absolute right-2 top-2 text-primary font-semibold underline"
                  >
                    {!showConfirmPassword ? "Show" : "Hide"}
                  </button>
                </div>
                {errorMessage && (
                  <p className="error-message text-sm lowercase text-red-600 italic">
                    {errorMessage}
                  </p>
                )}
              </div>
              <button
                disabled={
                  password !== confirmPassword || passwordStrength === "weak"
                }
                onClick={() => handleSubmit()}
                className={`w-full text-white 
                bg-${
                  password !== confirmPassword || passwordStrength === "weak"
                    ? "gray-300"
                    : "primary"
                }
                     hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Create an account
              </button>
              <p className="text-center text-sm font-light text-black dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary underline hover:underline dark:text-primary-500"
                >
                  Sign-in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
