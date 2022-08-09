class MailContentUtility {
    getLoginNotificationMailContent(timestamp) {
        let firstLine = `Bạn đã đăng nhập thành công vào hệ thống vào lúc [${timestamp}]`;
        let secondLine = 'Nếu bạn không thực hiện việc đăng nhập này, vui lòng thực hiện các biện pháp để bảo mật tài khoản!';
        return `${firstLine}\n\n${secondLine}`;
    }

    getConfirmationCodeMailContent(confirmationCode){
        let firstLine = 'Vui lòng nhập mã xác nhận bên dưới để hoàn tất việc xác thực tài khoản';
        let secondLine = `Mã xác nhận của bạn là: ${confirmationCode}`;
        return `${firstLine}\n\n\n${secondLine}`;
    }
}


module.exports = new MailContentUtility();