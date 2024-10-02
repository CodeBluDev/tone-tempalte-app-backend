const db = require('../models')
const Offer = db.offer;

exports.getOffers = async (req, res) => {
    // const page = req.query.page;
    // let limit = req.query.limit;
    //
    // if (!limit) {
    //     limit = 10;
    // } else {
    //     limit = parseInt(limit);
    // }

    const offers = await Offer.findAndCountAll({
        // limit: limit,
        // offset: parseInt(page) * limit, // 10 is the limit
    });

    res.status(200).send(offers);
}

exports.addOffer = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title) {
            throw Error(`'title' not found`)
        }

        if (!data.description) {
            throw Error(`'description' not found`)
        }

        const offer = await Offer.create(req.body);

        res.status(200).send(offer);
    } catch (e) {
        console.error(`addOffer: ${e}`);

        res.status(500).send(e);
    }
}

exports.updateOffer = async (req, res) => {
    try {
        const data = req.body;
        if (!data.title) {
            throw Error(`'title' not found`)
        }

        if (!data.description) {
            throw Error(`'description' not found`)
        }

        const offer = await Offer.update(data, {
            where: {
                id: req.params['id']
            }
        });

        res.status(200).send(offer);
    } catch (e) {
        console.error(`updateOffer: ${e}`);

        res.status(500).send(e);
    }
}

exports.deleteOffer = async (req, res) => {
    try {
        let id = req.params['id'];

        if (id) {
            await Offer.destroy({
                where: { id }
            });
        } else {
            await Offer.destroy({
                where: {},
                truncate: true
            });
        }

        res.status(200).send('success');
    } catch (e) {
        console.error(`updateOffer: ${e}`);

        res.status(500).send(e);
    }
}
