import React, { useEffect, useState } from "react";

const createUUID = () => Math.random().toString(36).substr(2, 9);
const LOC_KEY = "todoCategories";

const TodoList = () => {
  const [todoCategories, setTodoCategories] = useState(
    JSON.parse(localStorage.getItem(LOC_KEY) || "[]")
  );
  useEffect(() => {
    localStorage.setItem(LOC_KEY, JSON.stringify(todoCategories));
  }, [todoCategories]);
  const [selectedCatg, setSelectedCatg] = useState(
    todoCategories.length > 0 ? todoCategories[0].name : ""
  );

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <h2>TODO list</h2>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "30vw",
          }}
        >
          <ul>
            {todoCategories.map((catgItem) => {
              return (
                <li key={catgItem.id}>
                  <button
                    style={{
                      border:
                        catgItem.name === selectedCatg
                          ? "1px solid blue"
                          : "1px solid transparent",
                    }}
                    onClick={() => {
                      setSelectedCatg(catgItem.name);
                    }}
                  >
                    {catgItem.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              const catg = prompt("Enter catg");
              if (catg) {
                setTodoCategories([
                  ...todoCategories,
                  {
                    id: createUUID(),
                    name: catg,
                    items: [],
                  },
                ]);
                setSelectedCatg(catg);
              }
            }}
          >
            Add Catg
          </button>
        </div>
        <div
          style={{
            width: "70vw",
          }}
        >
          <ul>
            {(selectedCatg
              ? todoCategories.find((item) => item.name === selectedCatg).items
              : []
            ).map((todo) => {
              return (
                <li key={todo.id}>
                  <label>
                    <input
                      id={todo.id}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => {
                        setTodoCategories(
                          todoCategories.map((catgItem) => {
                            if (catgItem.name === selectedCatg) {
                              return {
                                ...catgItem,
                                items: catgItem.items.map((todoIterItem) => {
                                  if (todoIterItem.id === todo.id) {
                                    return {
                                      ...todoIterItem,
                                      completed: !todoIterItem.completed,
                                    };
                                  }
                                  return todoIterItem;
                                }),
                              };
                            }
                            return catgItem;
                          })
                        );
                      }}
                    />
                    {todo.name}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => {
              const todoText = prompt("Enter text");
              if (todoText) {
                setTodoCategories(
                  todoCategories.map((catgItem) => {
                    if (catgItem.name === selectedCatg) {
                      return {
                        ...catgItem,
                        items: [
                          ...catgItem.items,
                          {
                            id: createUUID(),
                            name: todoText,
                            completed: false,
                          },
                        ],
                      };
                    }
                    return catgItem;
                  })
                );
              }
            }}
          >
            Add to do
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
