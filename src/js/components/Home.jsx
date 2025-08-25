import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [userToDo, setUser] = useState({ name: "", todos: [] });

  useEffect(() => {
    const getUserTodo = async () => {
      try {
        const request = await fetch(
          "https://playground.4geeks.com/todo/users/rder",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!request.ok) {
          throw new Error(`Error en el request: ${request.status} - ${request.statusText}`);
        }

        const response = await request.json();
        console.log(response);
        setUser({ name: response.name, todos: response.todos });
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    getUserTodo();
  }, []);

  useEffect(() => {
    console.log(userToDo);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Hello Rigo!</h1>
      <p>
        <img src={rigoImage} />
      </p>
      <a href="#" className="btn btn-success">
        If you see this green button... bootstrap is working...
      </a>
      <p>
        Made by <a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
        love!
      </p>
    </div>
  );
};

export default Home;
