const smtp = require('../configs/smtp');
const { getStringCurrentDateTime } = require('./current_datetime_utility');
const mailContentUtility = require('./email_content_utility');

class MailUtility {
    sendLoginNotificationMail(userInfo) {
        if (process.env.SEND_LOGIN_NOTIFICATION === 'true') {
            let timestamp = getStringCurrentDateTime();
            smtp.sendMail(userInfo.email, 'Thông báo đăng nhập', mailContentUtility.getLoginNotificationMailContent(timestamp));
        }
    }

    sendConfirmationCode(userInfo, confirmationCode){
        if(process.env.SEND_CONFIRMATION_CODE === 'true'){
            smtp.sendMail(userInfo.email, 'Thông báo đăng nhập', mailContentUtility.getConfirmationCodeMailContent(confirmationCode));
        }
    }
}

module.exports = new MailUtility();