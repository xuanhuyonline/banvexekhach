const CoachTickets = require('../models/coach-ticket');
const { mongooseToObject, multipleMongooseToObject } = require('../utilities/mongoose-utility');
const slug = require('slug');
class CoachticketController {

    // [GET] /admin/coach-ticket/list
    index(req, res) {
        CoachTickets.find({})
            .then(coachTickets => res.render('./admin/coach-ticket/index', { 
                layout: 'admin', 
                statusCode: 'Failed',
                coachTickets: multipleMongooseToObject(coachTickets)
            })).catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
    };

    // [GET] /admin/coach-ticket/detail/:code
    detail(req, res){
        coachTickets.findOne({ code: req.params.code }, function(error, item){
            if(error)
                res.render('./admin/error', { layout: 'admin', err: error })
            else{
                if(item){
                    res.render('./admin/coach-ticket/detail', { layout: 'admin', coachTicket: mongooseToObject(item) });
                }
                else
                    res.redirect('/admin/coach-ticket/list');
            }
        });
    };

    // [GET],[POST] /admin/coach-ticket/create
    create(req, res) {
        if(req.method === 'GET'){
            res.render('./admin/coach-ticket/create', { 
                layout: 'admin',
                status: req.query.status 
            });
        }else{
            let coachTicket = new CoachTrips(res.body);
            coachTicket.save()
                .then(() => res.redirect("/admin/coach-ticket/create"))
                .catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
        }
    };

    // [GET],[POST] /admin/coach-ticket/edit
    edit(req, res, next) {
        if(req.method === 'GET'){
            res.render('./admin/coach-ticket/edit', { 
                layout: 'admin',
                status: req.query.status 
            });
        }else{
            let coachTicket= new CoachTickets(res.body);
            coachTicket.save()
                .then(() => res.redirect("/admin/coach-ticket/edit"))
                .catch(error => res.render('./admin/error', { layout: 'admin', err: error }));
        }
    }


}

module.exports = new CoachticketController();