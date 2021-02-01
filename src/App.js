import "./App.css";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoPage from "./Pages/Todo";

export const LOCAL_STORAGE_TODO_CATEGROIES = "todo-categories";

window.TodoList = [];

function App() {
  const [todoCategories, setTodoCategories] = useState([
    {
      id: "dfsdfsdf",
      name: "Shopping",
      items: [
        {
          id: "asfsfs",
          name: "Watch movie",
        },
      ],
    },
  ]);
  const handleAddCategory = () => {
    const category = prompt();
    setTodoCategories([
      ...todoCategories,
      {
        id: `${Math.random().toString(36).substr(2, 9)}`,
        name: category,
        items: [],
      },
    ]);
  };

  const handleOnAddTodo = (catg) => {
    const todoText = prompt();
    setTodoCategories(
      todoCategories.map((categoryItem) => {
        if (categoryItem.id === catg) {
          return {
            ...categoryItem,
            items: [
              ...categoryItem.items,
              setTodoCategories([
                ...todoCategories,
                {
                  id: `${Math.random().toString(36).substr(2, 9)}`,
                  name: todoText,
                },
              ]),
            ],
          };
        }
      })
    );
  };

  return (
    <div className="App">
      <Router>
        Categories
        <nav>
          <ul>
            {todoCategories.map((category) => (
              <li key={category}>
                <Link to={`/Todo/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
          <Switch>
            <Route path="/Todo/:Category">
              <TodoPage
                onAdd={handleOnAddTodo}
                todoCategories={todoCategories}
              />
            </Route>
          </Switch>
        </nav>
        <button onClick={handleAddCategory}>Add category</button>
      </Router>
    </div>
  );
}

export default App;
