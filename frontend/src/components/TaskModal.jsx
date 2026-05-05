import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskModal = ({ isOpen, onClose, taskData, onUpdate }) => {
	const [task, setTask] = useState("");
	const [dueDate, setDueDate] = useState(new Date());

	useEffect(() => {
		if (taskData) {
			setTask(taskData.task);
			// Convert string ISO date from backend back to a JS Date object
			setDueDate(
				taskData.dueDate ? new Date(taskData.dueDate) : new Date(),
			);
		}
	}, [taskData]);

	if (!isOpen) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		// Pass the updated task and Date object back to the parent
		onUpdate({ _id: taskData._id, task, dueDate });
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
				<h2 className="text-xl font-bold mb-4 text-gray-800">
					Edit Task
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-gray-600">
							Task Description
						</label>
						<input
							className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder="Update your task..."
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-gray-600">
							Due Date
						</label>
						<DatePicker
							selected={dueDate}
							onChange={(date) => setDueDate(date)}
							dateFormat="dd/MM/yyyy"
							showIcon
							className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
						/>
					</div>

					<div className="flex justify-end gap-2 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all active:scale-95"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskModal;
