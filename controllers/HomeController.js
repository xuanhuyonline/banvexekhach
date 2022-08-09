class HomeController {

    index(req, res, next) {
        res.render('./home/index', { pageName: 'Trang chủ' });
    };

    aboutUs(req, res, next){
        res.render('./home/about_us', { pageName: 'Về chúng tôi' });
    }
    
}

module.exports = new HomeController;