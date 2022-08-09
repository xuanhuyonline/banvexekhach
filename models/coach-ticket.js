const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const coachtickets = new Schema({
    coachTicketID: { type:String },
    Customer: {
        customerName: { type: String },
        gender: { type: String },
        email: { type: String },
        phone: { type: String }
    },
    Employees: [{
        username: { type: String },
        tiltle: { type: String }
    }],
    TicketsDetails: [{
        seatPosition: { type: String },
        price: { type: Number },
        subCharge: { type: Number },
        note: { type: String },
        intoMoney: { type: Number }
    }],
    CoachTrip: {
        code: { type: String },
        name: { type: String },
        departureTime: { type: Date },
        destinationTime: { type: Date },
        Coach: {
            seatNumber: { type: Number },
            licensePlate: { type: String }
        },
        Route: {
            name: { type: String },
            price: { type: Number }
        },
        purchaseDate: { type: Date },
        Payment: {
            paymentMethod: { type: String },
            status: { type: String },
            transactionContent: { type: String }
        },
        totalMoney: { type: Number }
    }
},{
    timestamps: true
});
// Add plugs
mongoose.plugin(slug);
coachtickets.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('coachtickets', coachtickets);