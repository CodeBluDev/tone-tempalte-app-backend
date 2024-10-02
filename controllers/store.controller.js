const db = require("../models");
const Store = db.store;

exports.getStore = async (req, res) => {
    const store = await Store.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    });

    res.status(200).send(store[0]);
}
