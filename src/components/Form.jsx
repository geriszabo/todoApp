import React, { useRef, useEffect } from "react";
import "./Form.css";

const Form = ({
  todos,
  setTodos,
  inputText,
  setInputText,
  isEditing,
  isEdited,
  setIsEdited,
  status,
  setStatus,
  setFilteredTodos,
  filteredTodos,
}) => {
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
    if (!isEditing) {
      setInputText("");
    }
  }, [isEditing]);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputText) {
      return;
    }
    if (isEditing) {
      const notEdited = todos.filter((item) => item.id !== isEdited);

      const filtered = todos
        .filter((item) => item.id === isEdited)
        .map((item) => ({ ...item, text: inputText }));

      setTodos([...notEdited, ...filtered]);
      setInputText("");
    }

    if (!isEditing) {
      setTodos([
        ...todos,
        { text: inputText, id: Math.random(), completed: false },
      ]);
      setInputText("");
    }
  };

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const filterHandler = (e) => {
    switch (status) {
      case "all":
        setFilteredTodos([]);
        setFilteredTodos(todos.filter((todo) => todo));

        break;
      case "completed":
        setFilteredTodos([]);
        setFilteredTodos(todos.filter((item) => item.completed === true));

        break;
      case "uncompleted":
        setFilteredTodos([]);
        setFilteredTodos(todos.filter((item) => item.completed === false));

        break;
    }
  };

  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => inputHandler(e)}
          placeholder="enter a todo"
        />
        <button type="submit">{isEditing ? "modify" : "add"}</button>
        <select name="todos" id="" onChange={statusHandler}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="uncompleted">uncompleted</option>
        </select>
      </form>
    </div>
  );
};

export default Form;
