import React from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <div className="todo-text">
        {todo.text}
      </div>
      <div className="btn-div">
        {/* <button className="btn-complete-todo" onClick={() => completeTodo(index)} title="Complete Item">Complete</button> */}
        <span className="btn-complete-todo material-icons md-24" onClick={() => completeTodo(index)} title="Complete Item">check_circle</span>
        {/* <button className="btn-remove-todo" onClick={() => removeTodo(index)} title="Remove Item">x</button> */}
        <span className="material-icons md-24 btn-remove-todo" onClick={() => removeTodo(index)} title="Remove Item">
          delete
        </span>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value || !value.trim() || !value.length === 0) {
      setValue("");
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter your to-do item"
        title="Enter your to-do item"
      />
      {/* <button className="btn-add-todo" title="Add Item"> + </button> */}
      <button className="btn-placeholder"><span className="material-icons md-30 btn-add-todo" onSubmit={handleSubmit} title="Add Item">add_circle</span></button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const displayStatistics = () => {
    const totalItems = todos.length;
    const totalCompletedItems = todos.filter(item => item.isCompleted === true).length;
    const totalIncompleteItems = todos.filter(item => item.isCompleted === false || !item.hasOwnProperty('isCompleted')).length;
    
    alert('Items To-do: ' + totalItems + '\nCompleted: ' + totalCompletedItems + '\nIncomplete: ' + totalIncompleteItems)
  }

  return (
    <div className="app">
      <h1 className="todo-title">To-Do App</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <button className="btn-statistics" onClick={() => displayStatistics()} title="Get Statistics">Get Statistics</button>
      </div>
    </div>
  );
}

export default App;
