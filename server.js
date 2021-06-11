const app = require("./config/app");
const accronymRoute = require("./api/acronym/route");
const { load } = require("./api/acronym/controller");

app.use("/api/acronym", accronymRoute);

app.get("/", load);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
