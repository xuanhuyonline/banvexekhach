const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const coachtrips = new Schema({
  code: { type: String },
  name: { type: String },
  departureTime: { type: Date },
  destinationTime: { type: Date },
  Coach: {
      name: { type: String },
      seatNumber: { type: Number },
      licensePlate: { type: String }
  },
  Route: {
      name: { type: String },
      price: { type: Number }
  },
  slug: { type: String, slug: 'name', unique: true }
},{
    timestamps: true
});
// Add plugs
mongoose.plugin(slug);
coachtrips.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('coachtrips', coachtrips);