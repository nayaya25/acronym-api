exports.verifyToken = async (req, res, next) => {
	try {
		const authData = req.headers["authorization"];

		if (authData) {
			const [, token] = authData && authData.split(" ");
			if (!token)
				return res
					.status(403)
					.json({ status: "error", message: "Auth Token Unavailable" });
			next();
		} else {
			return res
				.status(403)
				.json({ status: "error", message: "Auth Header Unavailable" });
		}
	} catch (err) {
		console.log("Error in Authorization", err);
		return res.status(403).json({ message: "Authorization failed" });
	}
};
