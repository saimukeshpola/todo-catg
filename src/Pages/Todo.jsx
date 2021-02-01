import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TodoPage = ({ onAdd, todoCategories = [] }) => {
  const params = useParams();
  const [todoItems, setToDoItems] = useState(
    (todoCategories.find((item) => item.id === params.Category) || {}).items ||
      []
  );
  return (
    <div>
      {params.Category}
      <ul>
        {todoItems.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setToDoItems(
                    todoItems.map((item) => {
                      if (item.id === todo.id) {
                        return {
                          ...todo,
                          completed: !todo.completed,
                        };
                      }
                      return item;
                    })
                  );
                }}
              />
              <span>{todo.name}</span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          onAdd(params.Category);
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoPage;
