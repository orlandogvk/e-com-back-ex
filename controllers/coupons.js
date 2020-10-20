
const { Coupons } = require('../models');



const findCoupon = async (request, response) => {
    try {
        const coupon = await Coupons.findAll();
        response.json({ results: coupon })

    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The coupons has not been found" })
    }

};

const findCouponById = async (request, response) => {
    const couponId = request.params.id;
    try {
        const coupon = await Coupons.findOne({
            where: {
                id: couponId
            }
        });
        response.json(coupon)

    } catch (error) {
        console.log(error)
        response
            .status(400)
            .json({ message: "The coupon has not been found" })
    }

};

const addCoupon = async (request, response) => {

    let {
        code,
        description,
        active,
        value,
        multiple,
        start_date,
        end_date
    } = request.body;

    try {

        const coupon = await Coupons.create({
            code,
            description,
            active,
            value,
            multiple,
            start_date,
            end_date
        })

        response.json({ message: "The coupon has been added successfully", coupon })

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The coupons don't created" })
    }

};

const updateCoupon = async (request, response) => {
    let couponId = request.params.id;

    let {
        code,
        description,
        active,
        value,
        multiple,
        start_date,
        end_date
    } = request.body;
    try {
        const coupons = await Coupons.update({
            code,
            description,
            active,
            value,
            multiple,
            start_date,
            end_date,
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: couponId
            }
        });
        const coupon = coupons[1][0].dataValues;
        response.json(coupon);
    } catch (error) {
        response
            .status(400)
            .json({ message: "The row has not updated correctly" });
    }
};

const deleteCoupon = async (request, response) => {
    let couponId = request.params.id;
    try {
        let coupon = await Coupons.destroy({ where: { id: couponId } });
        response.json({
            message: "The coupon has been deleted succesfully",
            coupon
        });

    } catch (error) {
        console.log(error);
        response
            .status(400)
            .json({ message: "The coupon has not been deleted" })
    }

};



// EXPORT
module.exports = {
    addCoupon,
    findCoupon,
    findCouponById,
    deleteCoupon,
    updateCoupon
}



