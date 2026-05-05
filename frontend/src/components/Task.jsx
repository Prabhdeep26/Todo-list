import React from "react";
import { toast } from "react-toastify";

const Task = ({ task, dueDate, status, _id, fetchTodos, onEdit }) => {
	const handleDelete = async () => {
		try {
			await fetch("http://localhost:3000/todo", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ _id: _id }),
			});
			console.log(_id);
			toast.success("Task deleted successfully!");
			fetchTodos();
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleStatus = async () => {
		try {
			await fetch("http://localhost:3000/todo/status", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: !status, _id: _id }),
			});
			fetchTodos();
			status
				? toast.success("Task marked as pending!")
				: toast.success("Task marked as done!");
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<li className="flex items-center justify-between p-4 text-white border-b border-white/10 last:border-0">
			<div className="flex items-center gap-3">
				<input
					type="checkbox"
					className="w-5 h-5 accent-green-400 cursor-pointer"
					checked={status}
				/>

				<div className="flex flex-col">
					<span className="font-medium">{task}</span>
					<span className="text-[10px] uppercase tracking-wider text-purple-200 opacity-80">
						Due: {new Date(dueDate).toLocaleDateString()}
					</span>
				</div>
			</div>

			{/* Action Buttons Container */}
			<div className="flex items-center gap-2">
				<button
					onClick={onEdit}
					className="bg-blue-500/80 hover:bg-blue-600 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 font-medium"
				>
					Edit
				</button>

				<button
					onClick={handleStatus}
					className={`text-white text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 font-medium ${
						status
							? "bg-amber-500 hover:bg-amber-600"
							: "bg-emerald-500 hover:bg-emerald-600"
					}`}
				>
					{status ? "Mark Pending" : "Mark Done"}
				</button>

				<button
					onClick={handleDelete}
					className="bg-red-500/80 hover:bg-red-600 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 font-medium"
				>
					Delete
				</button>
			</div>
		</li>
	);
};

export default Task;
