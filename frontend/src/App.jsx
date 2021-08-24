import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();

    const loggedInUser = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    }).then((res) => res.json());
    if (loggedInUser.error) {
      alert(loggedInUser.error);
    } else {
      setUser({ ...loggedInUser.user });
    }
  }

  async function handleNewUser(e) {
    e.preventDefault();
    const createdUser = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
      }),
    }).then((res) => res.json());
    if (createdUser.error) {
      alert(createdUser.error);
    } else {
      setUser({ ...createdUser.data });
    }
  }

  console.log(user);

  return (
    <div className="App">
      <form onSubmit={(e) => handleLogin(e)}>
        <h1>Login Form</h1>
        <label>
          UserName:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">submit</button>
      </form>

      <form onSubmit={(e) => handleNewUser(e)}>
        <h1>NewUser Form</h1>
        <label>
          UserName:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="text" name="password" required />
        </label>
        <label>
          Email:
          <input type="text" name="email" required />
        </label>
        <button type="submit">submit</button>
      </form>

      <button className="logout-button">Logout</button>
    </div>
  );
}

export default App;
