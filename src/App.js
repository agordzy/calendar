import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    // Загрузка задач из localStorage при запуске
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Сохранение задач в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        const taskWithId = { ...newTask, id: Date.now() };
        setTasks([...tasks, taskWithId]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
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

    const currentDate = new Date().toLocaleDateString('ru-RU');

    return (
        <div className="App">
            <h1>Календарь дедлайнов</h1>
            <p className="current-date">Сегодня: {currentDate}</p>

            <div className="filters">
                <button onClick={() => setFilter('all')}>Все</button>
                <button onClick={() => setFilter('week')}>Эта неделя</button>
                <button onClick={() => setFilter('overdue')}>Просроченные</button>
            </div>

            <TaskForm onAddTask={addTask} />
            <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} />
        </div>
    );
}

export default App;