const bcrypt = require('bcrypt');
const customerDAO = require('../dao/customer-dao');
const mailUtility = require('../utilities/mail_utility');
const randomUtility = require('../utilities/random_utility');
const customerValidator = require('../validators/customer_validator');
const md5 = require('md5');


class CustomerController {

    signIn(req, res) {
        if (req.method === 'GET')
            return res.render('./customer/sign-in', { pageName: 'Đăng nhập' });

        if (!customerValidator.validateSignIn(req))
            return res.render('./customer/sign-in', { pageName: 'Đăng nhập', status: 'Dữ liệu không hợp lệ!' });

        let phone = req.body.phone;
        let password = req.body.password;
        customerDAO.getCustomerByPhone(phone).then(queryResult => {
            if (queryResult.status === 'NotFound')
                return res.render('./customer/sign-in', { pageName: 'Đăng nhập', status: 'Không tìm thấy tài khoản này!' });

            let customer = queryResult.content;
            let match = bcrypt.compareSync(password, customer.password);
            if (match && customer.isActivated === true) {
                req.session.user = { phone: customer.phone, email: customer.email, fullname: customer.fullname };
                mailUtility.sendLoginNotificationMail(customer);
                return res.redirect('/customer/buy-ticket');
            } else if (match && customer.isActivated === false) {
                req.session.confirmationCode = randomUtility.getRandomString(12);
                mailUtility.sendConfirmationCode(customer, req.session.confirmationCode);
                req.session.token = md5(`customerId: ${customer.customerId}///${randomUtility.getRandomString(24)}`);
                return res.redirect(`/customer/verify-account?customerId=${customer.customerId}&isSignIn=true&token=${req.session.token}`);
            } else {
                return res.render('./customer/sign-in', { pageName: 'Đăng nhập', status: 'Mật khẩu sai!' });
            }
        }).catch(error => res.render('./customer/error', { layout: 'main', err: error }));
    };

    signUp(req, res) {
        if (req.method === 'GET')
            return res.render('./customer/sign-up', { pageName: 'Đăng ký' })

        customerDAO.createCustomer(req.body).then(queryResult => {
            if (queryResult.status === 'AlreadyExists')
                return res.render('./customer/sign-up', { pageName: 'Đăng ký', status: 'Đã tồn tại tài khoản này!' });
            else if (queryResult.status === 'Failed')
                return res.render('./customer/sign-up', { pageName: 'Đăng ký', status: 'Tạo tài khoản không thành công!' });
            else {
                req.session.confirmationCode = randomUtility.getRandomString(24);
                mailUtility.sendConfirmationCode(queryResult.content, req.session.confirmationCode);
                req.session.token = md5(`customerId: ${queryResult.content.customerId}///${randomUtility.getRandomString(24)}`);
                return res.redirect(`/customer/verify-account?customerId=${queryResult.content.customerId}&isSignIn=false&token=${req.session.token}`);
            }
        }).catch(error => res.render('./customer/error', { layout: 'main', err: error }));
    }

    verifyAccount(req, res) {
        if (req.method === 'GET') {
            if (req.query.customerId && req.query.isSignIn && req.session.token) {
                return res.render('./customer/verify-account', {
                    pageName: 'Xác minh tài khoản',
                    customerId: req.query.customerId,
                    isSignIn: req.query.isSignIn,
                    token: req.session.token
                });
            }

            return res.redirect('/customer/sign-up');
        }

        let customerId = req.body.customerId
        let confirmationCode = req.body.confirmationCode;
        let token = req.query.token;
        let isSignIn = req.query.isSignIn;

        if (confirmationCode !== req.session.confirmationCode)
            return res.render('./customer/verify-account', {
                pageName: 'Xác nhận tài khoản',
                customerId: customerId,
                isSignIn: isSignIn,
                token: token,
                status: 'Mã xác nhận không khớp!'
            });

        customerDAO.updateCustomerStatus(customerId, true).then(queryResult => {
            req.session.confirmationCode = 'empty';
            req.session.token = null;
            if (queryResult.status === 'Failed') {
                return res.redirect("/customer/sign-in");
            } else if (queryResult.status === 'Success' && isSignIn === 'false') {
                return res.redirect("/customer/sign-in");
            } else if (queryResult.status === 'Success' && isSignIn === 'true') {
                req.session.user = { phone: queryResult.content.phone, email: queryResult.content.email, fullname: queryResult.content.fullname };
                return res.redirect("/customer/buy-ticket");
            } else {
                return res.redirect("/customer/sign-up");
            }
        }).catch(error => res.render('./customer/error', { layout: 'main', err: error }));
    }

    buyTicket(req, res) {
        if (!req.session.user)
            return res.redirect('/customer/sign-in');

        if (req.method === "GET")
            return res.render('./customer/buy-ticket', { pageName: 'Mua vé', user: req.session.user });

        res.render('./customer/buy-ticket', { pageName: 'Mua vé', user: req.session.user });
    };
}

module.exports = new CustomerController;