import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState('all');

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

    // Сортировка
    const sortedTasks = [...tasks].sort((a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    );

    // Получение начала и конца недели
    const getWeekRange = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 - воскресенье, 1 - понедельник и т.д.

        // Начало недели (понедельник)
        const startOfWeek = new Date(today);
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(today.getDate() - daysToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        // Конец недели (воскресенье)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return {
            start: startOfWeek.toISOString().split('T')[0],
            end: endOfWeek.toISOString().split('T')[0]
        };
    };

    // Фильтрация
    const today = new Date().toISOString().split('T')[0];
    const weekRange = getWeekRange();

    const filteredTasks = sortedTasks.filter(task => {
        if (filter === 'overdue') return task.deadline < today;
        if (filter === 'week') return task.deadline >= weekRange.start && task.deadline <= weekRange.end;
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