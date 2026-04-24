function TaskList({ tasks }) {
  if (tasks.length === 0) return <p>Нет заданий</p>;

  return (
    <ul>
      {tasks.map((task, idx) => (
        <li key={idx}>
          <strong>{task.title}</strong> — {task.deadline}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;