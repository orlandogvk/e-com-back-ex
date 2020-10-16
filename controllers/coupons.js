
const {Coupons} = require('../models');



const findCoupon = async (request, response) => {
    const coupon = await Coupons.findAll();
    response.json({ results: coupon })
};

const findCouponById = async (request, response) => {
    const couponId = request.params.id;
    const coupon = await Coupons.findOne({
        where: {
            id: couponId
        }
    });
    response.json(coupon)
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


    const coupon = await Coupons.create({
        code,
        description,
        active,
        value,
        multiple,
        start_date,
        end_date,
        created_at: new Date(),
        updated_at: new Date()
    })
   
    response.json({ message: "The coupon has been added successfully", coupon })
};

const updateCoupon =async (request, response) => {
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
    let coupon = await Coupons.destroy({where: {id: couponId}});
    response.json({
        message: "The coupon has been deleted succesfully",
        coupon
    });
};



// EXPORT
module.exports = {
    addCoupon,
    findCoupon,
    findCouponById,
    deleteCoupon,
    updateCoupon
}



