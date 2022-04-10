import logo from "./logo.svg";
import "./App.css";
import Amplify, { API } from "aws-amplify";
import React, { useEffect, useState } from "react";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const myAPI = "todos";
const path = "/todo";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  //Function to fetch from our backend and update customers array
  function getTodo(e) {
    let todoId = e.input;
    API.get(myAPI, path + "/" + todoId)
      .then((response) => {
        console.log(response);
        let newTodos = [...todos];
        newTodos.push(response);
        setTodos(newTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <p>Hey {user.username}, welcome to my channel, with auth!</p>
          <button onClick={signOut}>Sign out</button>
          <div>
            <h1>Super Simple React App</h1>
            <div>
              <input
                placeholder="customer id"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <br />
            <button onClick={() => getTodo({ input })}>
              Get Customer From Backend
            </button>

            <h2
              style={{
                visibility: todos.length > 0 ? "visible" : "hidden",
              }}
            >
              Response
            </h2>
            {todos.map((thisTodo, index) => {
              return (
                <div key={thisTodo.customerId}>
                  <span>
                    <b>CustomerId:</b> {thisTodo.todoId} - <b>CustomerName</b>:{" "}
                    {thisTodo.todoName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
