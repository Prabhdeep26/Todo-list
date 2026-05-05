import React, { useEffect } from "react";
import Task from "./Task";

const TaskContainer = ({todos, fetchTodos, onEditBtnClick }) => {
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div className="w-full max-w-lg bg-white/20 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/30">
			<ul className="divide-y divide-white/10">
				{todos.map((todo) => (
					<Task
						key={todo._id}
						task={todo.task}
						_id={todo._id}
						dueDate={todo.dueDate}
						status={todo.status}
						fetchTodos={fetchTodos}
						onEdit={()=> onEditBtnClick(todo)}
					/>
				))}
			</ul>
		</div>
	);
};

export default TaskContainer;
