const { constructData, getPagination } = require("../../utilities");
const Acronym = require("./model");
const acronymsJson = require("../../acronym.json");

module.exports = {
	async getAcronyms(params) {
		const { from, limit: limitParam, search: searchParam } = params;
		const search = searchParam ? searchParam : "";
		const { limit, offset } = getPagination(from, limitParam);
		try {
			const acronyms = await Acronym.find({
				acronym: ".*" + search + ".*",
			})
				.select(["acronym", "definition"])
				.skip(offset)
				.limit(limit);

			return acronyms;
		} catch (error) {
			console.log({ error });
			return [];
		}
	},
	async createAcronym(acronym) {
		try {
			const newAcronym = Acronym.create(acronym);
			return newAcronym;
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
			const deletedAcronym = await Acronym.findOneAndDelete({
				_id: acronymId,
			});
			return deletedAcronym;
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
