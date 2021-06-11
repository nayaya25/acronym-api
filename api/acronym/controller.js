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
		res.status(200).json({
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
	const { accronym, definition } = req.body;
	const accronymData = { accronym, definition, createdAt: new Date() };
	try {
		const newAcronym = await createAcronym(accronymData);
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
	const { accronym, definition } = req.body;
	const accronymData = { accronym, definition, updatedAt: new Date() };
	try {
		const updatedAccronym = await updateAcronym(accronym, accronymData);
		res.status(200).json({
			status: "success",
			message: "Accronym Update Successful",
			accronym: updatedAccronym,
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
	try {
		await loadData();
		res.status(200).json({ status: "success" });
	} catch (error) {
		console.log({ error });
		res.status(503).json({ status: "error" });
	}
};

module.exports = { getAll, create, update, destroy, load };
