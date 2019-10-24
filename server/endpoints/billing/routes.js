const stripe = require('stripe')(process.env.stripeSecretKey);
const router = require('express').Router();

router.post('/stripe', async (req, res, next) => {
    let charge = await stripe.charges.create({
        amount: req.body.price,
        currency: 'usd',
        description: '1st Monthly Package!',
        source: req.body.id,
    });
    if (charge) {
        res.status(200).json({
            message: 'Muahahaha. Successfully charged user!',
        });
    } else {
        next({
            status: 500,
            message: 'Looks like we shit the bed',
        });
    }
});

module.exports = router;
