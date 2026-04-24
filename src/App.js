import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="App">
            <h1>Календарь дедлайнов</h1>
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
}

export default App;