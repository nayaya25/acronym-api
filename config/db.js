const mongoose = require("mongoose");
const { envVariables } = require("../utilities");

mongoose.connect(envVariables.databaseConnString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", () => {
	console.log("> error occurred from the database");
});

db.once("open", () => {
	console.log("> successfully opened the database");
});

module.exports = mongoose;
