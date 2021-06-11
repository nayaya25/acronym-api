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
	async updateAcronym(acronymId, newData) {
		try {
			const updatedAcronym = await Acronym.findOneAndUpdate(
				{ _id: acronymId },
				newData
			);
			updatedAcronym.save();
			return updatedAcronym;
		} catch (error) {
			console.log({ error });
			return {};
		}
	},
	async deleteAcronym(acronymId) {
		try {
			return await Acronym.findOneAndDelete({
				_id: acronymId,
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
