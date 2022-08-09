const CoachTrips = require('../models/coach-trip');
const { mongooseToObject, multipleMongooseToObject } = require('../utilities/mongoose-utility');
const coachTripDAO = require('../dao/coach-trip-dao');

//const PaginatedResults = require('../middlewares/PageNumberMiddleware');
//const session = require('express-session');
//const isLoginMiddleware = require('../middlewares/IsLoginMiddleware');

class CoachTripController {

    // [GET] /admin/coach-trip/list
    index(req, res) {
        coachTripDAO.getCoachTrips()
            .then(coachTrips => res.render('./admin/coach-trip/index', {
                layout: 'admin',
                coachTrips: coachTrips
            })).catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
    };

    // [GET] /admin/coach-trip/detail/:code
    detail(req, res) {
        coachTripDAO.getCoachTrip(req.params.code)
            .then(coachTrip => {
                if (coachTrip)
                    res.render('./admin/coach-trip/detail', { layout: 'admin', coachTrip: coachTrip });
                else
                    res.redirect('/admin/coach-trip/list');
            }).catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
    };

    // [GET],[POST] /admin/coach-trip/create
    create(req, res) {
        if (req.method === 'GET') {
            res.render('./admin/coach-trip/create', {
                layout: 'admin',
                status: req.query.status
            });
        } else {
            let coachTrip = new CoachTrips(res.body);
            coachTrip.save()
                .then(() => res.redirect("/admin/coach-trip/create"))
                .catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
        }
    };

    // [GET],[POST] /admin/coach-trip/edit
    edit(req, res, next) {
        if (req.method === 'GET') {
            res.render('./admin/coach-trip/edit', {
                layout: 'admin',
                status: req.query.status
            });
        } else {
            let coachTrip = new CoachTrips(res.body);
            coachTrip.save()
                .then(() => res.redirect("/admin/coach-trip/edit"))
                .catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
        }
    }


}

module.exports = new CoachTripController;