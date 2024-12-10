import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ArrowRight, Eye, EyeSlash } from "react-bootstrap-icons";

import { login } from "../../lib/backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Login`;
  });

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage(""); // reset for new attempt
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Username and password are required.");
      setIsLoading(false);
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: errorMessage,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
          cancelButton: "custom-swal-cancel-button",
        },
      });
      return;
    }

    try {
      /* 
        error catching doesn't work without `await`
        no idea why 
      */
      await login(email, password);
      setErrorMessage(""); // Clear error message on success
    } catch (error) {
      let errorMessage;
      if (error.status === 400) {
        errorMessage =
          "Invalid credentials. Please check your username and password.";
      } else if (error.status === 404) {
        errorMessage = "User not found. Please check your details.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again later.";
      }
      setErrorMessage(errorMessage); // Update state with the error message

      // Show SweetAlert2 popup for the error
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
          cancelButton: "custom-swal-cancel-button",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col text-center mb-[20vh] w-full">
        <h1 className="text-4xl font-bold mb-4">Class Notes</h1>
        <p className="text-lg mb-8 text-gray-500">
          Please enter your credentials to login and access the resources.
        </p>
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="form-control mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 flex">
            <input
              type={showPassword ? "password" : "text"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn ml-4">
              {showPassword ? (
                <Eye
                  onClick={() => setShowPassword(false)}
                  className="text-lg"
                />
              ) : (
                <EyeSlash
                  onClick={() => setShowPassword(true)}
                  className="text-lg"
                />
              )}
            </div>
          </div>
          <button
            className={`btn btn-neutral w-full ${
              isLoading ? "btn-disabled" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <>
                Login <ArrowRight className="text-lg" />
              </>
            )}
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-400">
          Don&apos;t have an account? Contact me at +94777662700.
        </p>
      </div>
    </div>
  );
};

export { Login };
