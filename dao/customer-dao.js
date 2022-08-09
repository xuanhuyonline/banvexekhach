const Customer = require('../models/customer');
const { mongooseToObject, multipleMongooseToObject } = require('../utilities/mongoose-utility');
const randomUtility = require('../utilities/random_utility');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const QueryResult = require('./query-status');
const saltRounds = 10;

class CustomerDAO {

    getCustomers() {
        return new Promise((resolve, reject) => {
            Customer.find({}, function (error, customers) {
                if (error)
                    reject(error);

                resolve(multipleMongooseToObject(customers));
            });
        });
    }

    getCustomer(customerId) {
        return new Promise((resolve, reject) => {
            Customer.findOne({ customerId: customerId }, function (error, customer) {
                if (error)
                    reject(error);
                else if (customer)
                    resolve(new QueryResult('Success', mongooseToObject(customer)));
                else
                    resolve(new QueryResult('NotFound', null));
            });
        });
    }

    getCustomerByPhone(phone) {
        return new Promise((resolve, reject) => {
            Customer.findOne({ phone: phone }, function (error, customer) {
                if (error)
                    reject(error);
                else if (customer)
                    resolve(new QueryResult('Success', mongooseToObject(customer)));
                else
                    resolve(new QueryResult('NotFound', null));
            });
        });
    }

    createCustomer(item) {
        return new Promise((resolve, reject) => {
            Customer.findOne({ $or: [{ phone: item.phone, email: item.email }] }, function (error, customer) {
                if (error) {
                    reject(error);
                } else if (customer) {
                    resolve(new QueryResult('AlreadyExists', null));
                } else {
                    let newCustomer = new Customer(item);
                    newCustomer.customerId = md5(`${newCustomer.email}&${newCustomer.phone}///${randomUtility.getRandomString(24)}`);
                    newCustomer.password = bcrypt.hashSync(newCustomer.password, saltRounds);
                    newCustomer.isActivated = false;

                    newCustomer.save(function (error2, result) {
                        if (error2) {
                            reject(error2);
                        } else {
                            if (result)
                                resolve(new QueryResult("Success", mongooseToObject(result)));
                            else
                                resolve(new QueryResult("Failed", null));
                        }
                    });
                }
            });
        });
    }

    updateCustomerStatus(customerId, isActivated) {
        return new Promise((resolve, reject) => {
            Customer.findOne({ customerId: customerId }, function (error, customer) {
                if (error) {
                    reject(error);
                } else if (customer) {
                    customer.isActivated = isActivated;
                    customer.save(function (error2, result) {
                        if (error2) {
                            reject(error2);
                        } else {
                            if (result)
                                resolve(new QueryResult('Success', mongooseToObject(result)));
                            else
                                resolve(new QueryResult('Failed', null));
                        }
                    });
                } else {
                    resolve(new QueryResult('NotFound', null));
                }
            });
        });
    }
}

module.exports = new CustomerDAO();