const { constructData, getPagination } = require("../../utilities");
const Acronym = require("./model");
const acronymsJson = require("../../acronym.json");

module.exports = {
	async getAcronyms(params) {
		const { from, limit: limitParam, search: searchParam } = params;
		const search = searchParam ? searchParam : "";
		const { limit, offset } = getPagination(from, limitParam);
		try {
			return await Acronym.find({
				acronym: { $regex: `.*${search}.*`, $options: "i" },
			})
				.select(["acronym", "definition"])
				.skip(offset)
				.limit(limit);
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createAcronym(acronym) {
		try {
			return await Acronym.create(acronym);
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async updateAcronym(acronym, newData) {
		try {
			return await Acronym.findOneAndUpdate({ acronym }, newData, {
				new: true,
			});
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteAcronym(acronym) {
		try {
			return await Acronym.findOneAndDelete({
				acronym,
			});
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async loadData() {
		try {
			const data = constructData(acronymsJson);
			await Acronym.insertMany(data);
			return { status: "success" };
		} catch (error) {
			console.log({ error });
		}
	},
};
