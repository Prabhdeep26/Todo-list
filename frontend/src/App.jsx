import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskContainer from "./components/TaskContainer";
import { ToastContainer, toast } from "react-toastify";
import TaskModal from "./components/TaskModal";

const App = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const taskRef = useRef("");
	const [todos, setTodos] = useState([]);

	const handleEditClick = (todo) => {
		setCurrentTask(todo);
		setIsEditModalOpen(true);
	};

	const fetchTodos = async () => {
		try {
			const response = await fetch(
				"https://todo-list-backend-navy.vercel.app/todo",
				{
					method: "GET",
				},
			);
			const data = await response.json();
			setTodos(data);
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const taskValue = taskRef.current.value;
		if (!taskValue) {
			toast.error("Task is required");
			return;
		}

		try {
			await fetch(
				"https://todo-list-backend-navy.vercel.app/todo/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						task: taskRef.current.value,
						dueDate: selectedDate,
					}),
				},
			);
			toast.success("Task added successfully!");
			fetchTodos();
		} catch (err) {
			toast.error(err.message);
		}

		console.log({ task: taskValue, dueDate: selectedDate });
		taskRef.current.value = "";
	};

	const updateTask = async (data) => {
		try {
			await fetch(
				"https://todo-list-backend-navy.vercel.app/todo/update",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);
			toast.success("Task Updated successfully");
			fetchTodos();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center pt-20 pb-5 px-4">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<div className="text-center mb-10">
				<h1 className="text-5xl font-bold text-white mb-2">
					Simple Todo List
				</h1>
				<p className="text-purple-100 opacity-90">
					Welcome to this ToDo list!
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md flex flex-col items-center gap-4 mb-12"
			>
				<div className="w-full flex flex-col md:flex-row gap-3">
					<input
						type="text"
						ref={taskRef}
						placeholder="Enter a todo and press Add or Enter"
						className="flex-1 p-3 rounded-lg outline-none text-gray-800 shadow-xl text-center bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-300 transition-all"
					/>

					<div className="w-full md:w-44">
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							dateFormat="dd/MM/yyyy"
							showIcon
							className="w-full p-3 rounded-lg outline-none text-gray-800 shadow-xl text-center cursor-pointer bg-white focus:ring-2 focus:ring-indigo-300 transition-all"
						/>
					</div>
				</div>

				<button
					type="submit"
					className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-2.5 rounded-full shadow-lg transition-all font-bold active:scale-95"
				>
					Add
				</button>
			</form>

			<TaskModal
				isOpen={isEditModalOpen}
				taskData={currentTask}
				onUpdate={updateTask}
				onClose={() => setIsEditModalOpen(false)}
			/>

			<TaskContainer
				todos={todos}
				fetchTodos={fetchTodos}
				onEditBtnClick={handleEditClick}
			/>
		</div>
	);
};

export default App;
