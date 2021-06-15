const envVariables = require("./env");

const constructData = (objArr) => {
	const data = [];
	objArr.map((obj) => {
		const [acronym] = Object.keys(obj);
		const [definition] = Object.values(obj);
		data.push({ acronym, definition });
	});
	return data;
};

const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};
module.exports = { envVariables, constructData, getPagination };
