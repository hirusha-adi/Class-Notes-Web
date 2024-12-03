import { useEffect, useState } from "react";
import { login } from "../../lib/backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `Login`;
  });

  async function handleLogin(e) {
    e.preventDefault();
    await login(email, password);
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
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Login };
