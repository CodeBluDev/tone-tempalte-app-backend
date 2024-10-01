const db = require("../models");
const Store = db.store;

exports.findOne = async (req, res) => {
    const store = await Store.findOne({
        where: {
            id: req.params["id"],
        }
    });

    res.status(200).send(store);
}
