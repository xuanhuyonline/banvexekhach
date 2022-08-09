const express = require('express');
const router = express.Router();
const coachTripController = require('../admin_controllers/CoachTripController');
const coachTicketsController = require('../admin_controllers/Coach-ticketController');

//Chuẩn hóa lại tên biến, tên class, hiện tại đặt k theo quy tắc nào hết
//cái nào v ông
router.get('/coach-trip/list', coachTripController.index);
router.get('/coach-trip/detail/:code', coachTripController.detail);
router.get('/coach-trip/create', coachTripController.create);
router.post('/coach-trip/create', coachTripController.create);
router.get('/coach-trip/edit/:code', coachTripController.edit);
router.post('/coach-trip/edit/:code', coachTripController.edit);

router.get('/coach-ticket/list', coachTicketsController.index);
router.get('/coach-ticket/create', coachTicketsController.create);


module.exports = router;