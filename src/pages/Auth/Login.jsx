import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { login } from "../../lib/backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <>
      <div className="min-h-screen">
        <div className="m-12">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Login };
