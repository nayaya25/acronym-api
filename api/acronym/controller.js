const {
	getAcronyms,
	updateAcronym,
	deleteAcronym,
	createAcronym,
	loadData,
} = require("./service");

const getAll = async (req, res) => {
	try {
		const acronyms = await getAcronyms(req.query);
		res.status(206).json({
			status: "success",
			message: "Acronyms Fetch Successful",
			acronyms,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Internal Server Error" });
	}
};

const create = async (req, res) => {
	const { acronym, definition } = req.body;
	try {
		const newAcronym = await createAcronym({ acronym, definition });
		res.status(201).json({
			status: "success",
			message: "Accronym Creation Successful",
			accronym: newAcronym,
		});
	} catch (error) {
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const update = async (req, res) => {
	const { acronym: newAcronym, definition } = req.body;
	const { acronym } = req.params;
	try {
		const updatedAcronym = await updateAcronym(acronym, {
			acronym: newAcronym,
			definition,
		});
		res.status(200).json({
			status: "success",
			message: "Accronym Update Successful",
			acronym: updatedAcronym,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const destroy = async (req, res) => {
	const { accronym } = req.params;
	try {
		const deletedAcronym = await deleteAcronym(accronym);
		res.status(200).json({
			status: "success",
			message: "Accronym Deletion Successful",
			accronym: deletedAcronym,
		});
	} catch (error) {
		console.log({ error });
		res.status(500).json({ status: "error", message: "Server Error" });
	}
};

const load = async (req, res) => {
	console.log({ body: req.body });
	try {
		// await loadData();
		res.status(200).json({ status: "success" });
	} catch (error) {
		console.log({ error });
		res.status(503).json({ status: "error" });
	}
};

module.exports = { getAll, create, update, destroy, load };
