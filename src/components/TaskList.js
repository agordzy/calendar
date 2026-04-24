function TaskList({ tasks }) {
    const today = new Date().toISOString().split('T')[0];

    if (tasks.length === 0) return <p>Нет заданий</p>;

    return (
        <ul>
            {tasks.map((task, idx) => (
                <li
                    key={idx}
                    style={{ color: task.deadline < today ? 'red' : 'black' }}
                >
                    <strong>{task.title}</strong> — {task.deadline}
                    {task.deadline < today && <span> ⚠️ Просрочено</span>}
                </li>
            ))}
        </ul>
    );
}

export default TaskList;