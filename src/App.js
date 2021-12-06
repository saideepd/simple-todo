import React from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const defaultItem = [{ text: "Add some items to list", isCompleted: false }];

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div 
      className="todo"
      style={{ 
        textDecoration: todo.isCompleted ? "line-through" : "", 
        backgroundColor: todo.isCompleted ? "darkgray": ""
      }}
    >
      <div className="todo-text">
        {todo.text}
      </div>
      <div className="btn-div">
        <span className="btn-complete-todo material-icons md-24" onClick={() => completeTodo(index)} title="Complete Item">check_circle</span>
        <span className="material-icons md-24 btn-remove-todo" onClick={() => removeTodo(index)} title="Remove Item">delete</span>
      </div>
    </div>
  );
};

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // prevent adding blank values
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
        autoFocus
      />
      <button className="btn-placeholder"><span className="material-icons md-30 btn-add-todo" onSubmit={handleSubmit} title="Add Item">add_circle</span></button>
    </form>
  );
}

function App() {
  var todos, setTodos;
  // const [todos, setTodos] = React.useState([
  //   { text: "Learn about React", isCompleted: false },
  //   { text: "Add some items to list", isCompleted: false },
  //   { text: "Build really cool todo app", isCompleted: false }
  // ]);
  [todos,setTodos] = React.useState(JSON.parse(localStorage.getItem('todos')) || defaultItem);
  console.log('TempTodo: ',todos);

  const addTodo = text => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    // let localData = JSON.parse(localStorage.getItem('todos') || "[]");
    // console.log(localData);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    allTasksCompleted(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    if(newTodos.length === 0) {
        setTodos(defaultItem)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    // allTasksCompleted(newTodos);
  };

  const displayStatistics = () => {
    const totalItems = todos.length;
    const totalCompletedItems = todos.filter(item => item.isCompleted === true).length;
    const totalIncompleteItems = todos.filter(item => item.isCompleted === false || !item.hasOwnProperty('isCompleted')).length;
    
    alert('*** Statistics ***\n\n'
      + 'Items to-do: ' + totalItems 
      + '\nCompleted:  ' + totalCompletedItems 
      + '\nIncomplete:  ' + totalIncompleteItems);
  }

  const clearAllTodo = () => {
    if(localStorage.length > 0) {
      localStorage.clear();
      const newTodos = [...todos];
      while(newTodos.length !== 0) {
        newTodos.pop();
      }
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  }

  const allTasksCompleted = (newTodos) => {
    const totalIncompleteItems = newTodos.filter(item => item.isCompleted === false || !item.hasOwnProperty('isCompleted')).length;
    
    if (totalIncompleteItems === 0) {
      alert('Woohooo!! You\'ve completed all the tasks!');
      launchConfetti();
    }
  }

  const launchConfetti = () => {
      // launch confetti for 1.5 seconds
      var duration = 1.5 * 1000;
      var end = Date.now() + duration;

      (function frame() {
        // launch a few confetti from the left edge
        confetti({
          particleCount: 10,
          startVelocity: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 1 }
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 10,
          startVelocity: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
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
        <div className="row">
          <div className="col"><button className="btn-statistics" onClick={() => displayStatistics()} title="Get Statistics">Get Statistics</button></div>
          <div className="col btn-clear-row"><span className="material-icons md-30 btn-clear" onClick={() => clearAllTodo()} title="Clear List">delete_forever</span></div>
        </div>
      </div>
    <script src="confetti.js"/>
    </div>
  );
}

export default App;
