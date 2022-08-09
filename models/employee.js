const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const employee = new Schema({
    username: { type: String },
    fullName: { type: String },
    phone: { type: String },
    email: { type: String },
    gender: { type: String, default: 'Nam' },
    birthday: { type: Date },
    avatar: { type: String },
    title: { type: String, default: 'Conductor' },
    password: { type: String }
},{
    timestamps: true
});
// Add plugs
mongoose.plugin(slug);
employee.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('employee', employee);