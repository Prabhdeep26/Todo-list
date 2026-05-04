const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true,
		trim: true,
		maxLength: 200,
		minLength: 4,
	},
	dueDate: {
		type: Date,
	},
	status: {
		type: Boolean,
		default: false,
	},
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
