require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require("cors");
const Todo = require("./models/Todo");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.post("/todo/create", async (req, res) => {
	try {
		const task = await Todo.create(req.body);
		res.json("data added successfully");
	} catch (err) {
		res.status(400).json("Failed to create task " + err.message);
	}
});

app.get("/todo", async (req, res) => {
	try {
		const tasks = await Todo.find({});
		res.json(tasks);
	} catch (err) {
		res.status(400).json("Failed to fetch data " + err.message);
	}
});

app.patch("/todo/update", async (req, res) => {
	try {
		const _id = req.body._id;
		await Todo.findByIdAndUpdate(_id, req.body);
		res.json("data updated successfully");
	} catch (err) {
		res.status(400).json("failed to update data " + err.message);
	}
});

app.patch("/todo/status", async (req, res) => {
	try {
		const _id = req.body._id;
		await Todo.findByIdAndUpdate(_id, req.body);
		res.json("data updated successfully");
	} catch (err) {
		res.status(400).json("failed to update data " + err.message);
	}
});

app.delete("/todo", async (req, res) => {
	try {
		const _id = req.body._id;
		await Todo.findByIdAndDelete(_id);
		res.json("Task deleted successfully");
	} catch (err) {
		res.status(400).json("Request failed " + err.message);
	}
});

app.use("/", (req, res) => {
	res.json("Everything is working fine");
});

connectDB()
	.then(() => {
		console.log("Databse connected successfully");
		app.listen(PORT, () => {
			console.log("Server is listening");
		});
	})
	.catch((err) => {
		console.error("Error connecting Database");
	});

module.exports = app;
