const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/QuanLyDichVuXeKhach', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('+ MONGODB CONNECTION SUCCESSFULLY!');
    } catch (error) {
        console.log('+ MONGODB CONNECTION FAILURE!');
    }
}

module.exports = { connect };