import React from "react";
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [userToDo, setUser] = useState({ name: "", todos: [] });
  const [inputTask, setInputTask] = useState("");
  const [inputErrors, setErrors] = useState([]);

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
        throw new Error(
          `Error en el request: ${request.status} - ${request.statusText}`
        );
      }

      const response = await request.json();
      console.log(response);
      setUser({ name: response.name, todos: response.todos });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getUserTodo();
  }, []);

  const addTask = async () => {
    if (inputTask.trim() === "") {
      setErrors([...inputErrors, "No puedes agregar tareas vacías"]);
      return;
    }

    const newTask = { label: inputTask, is_done: true };

    setErrors([]);

    try {
      const request = await fetch(
        "https://playground.4geeks.com/todo/todos/rder",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );

      if (request.ok) {
        getUserTodo();
        setInputTask("");
      } else {
        throw new Error(
          `Error en el request: ${request.status} - ${request.statusText}`
        );
      }
    } catch (error) {
      setErrors([
        "Revisa tu conexión a internet, error al conectar con el servidor",
      ]);
      console.error("Error: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const request = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (request.ok) {
        setUser({
          ...userToDo,
          todos: userToDo.todos.filter((task) => task.id !== id),
        });
        setErrors([]);
      } else {
        setErrors(["Error al borrar"]);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
      console.log("Enter Presionado");
    }
  }

  return (
    <div className="container text-center p-5">
      <h1 className="display-3"> ToDo List de: {userToDo.name} </h1>
      <ul className="my-2">
        {inputErrors?.map((error, index) => (
          <li key={index}> {error} </li>
        ))}
      </ul>
      <ul className="list-group">
        <li className="list-group-item">
          <input
            className="form-control fs-3 text-center"
            name="task"
            onChange={(e) => {
              setInputTask(e.target.value);
            }}
            value={inputTask}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="What do you need to be ?"
          />
        </li>
        {userToDo.todos?.map((todos) => (
          <li key={todos.id} className="list-group-item fs-3">
            {todos.label}{" "}
            <button
              className="btn btn-danger px-2 trash-button"
              onClick={() => deleteTask(todos.id)}
            >
              {" "}
              <BiTrash size={20} />{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
