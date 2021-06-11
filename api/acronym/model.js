const db = require("../../config/db");

const schema = {
	acronym: { type: db.SchemaTypes.String },
	definition: { type: db.SchemaTypes.String },
};

const acronymSchema = db.Schema(schema, { timestamps: true });
acronymSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});
const Acronym = db.model("Acronym", acronymSchema);

module.exports = Acronym;
