function TaskList({ tasks, onDeleteTask }) {
    const today = new Date().toISOString().split('T')[0];

    if (tasks.length === 0) return <p>Нет заданий</p>;

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <div className="task-info">
                        <strong>{task.title}</strong> — {task.deadline}
                        {task.deadline < today && <span className="overdue-badge"> ⚠️ Просрочено</span>}
                    </div>
                    <button
                        className="delete-btn"
                        onClick={() => onDeleteTask(task.id)}
                    >
                        ✗ Удалить
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;