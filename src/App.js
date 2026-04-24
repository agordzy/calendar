import { useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    // Сортировка по дате
    const sortedTasks = [...tasks].sort((a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    );

    // Фильтрация
    const today = new Date().toISOString().split('T')[0];
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 7);
    const weekLaterStr = weekLater.toISOString().split('T')[0];

    const filteredTasks = sortedTasks.filter(task => {
        if (filter === 'overdue') return task.deadline < today;
        if (filter === 'week') return task.deadline >= today && task.deadline <= weekLaterStr;
        return true;
    });

    return (
        <div className="App">
            <h1>Календарь дедлайнов</h1>

            <div className="filters">
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('week')}>Эта неделя</button>
                <button onClick={() => setFilter('overdue')}>Просроченные</button>
            </div>

            <TaskForm onAddTask={addTask} />
            <TaskList tasks={filteredTasks} />
        </div>
    );
}

export default App;