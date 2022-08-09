const coachTrips = require('../models/coach-trip');
const { mongooseToObject, multipleMongooseToObject } = require('../utilities/mongoose-utility');

class CoachTripDAO {

    /**
     * 
     * @returns 
     */
    getCoachTrips() {
        return new Promise((resolve, reject) => {
            coachTrips.find({}, function (error, coachTrips) {
                if (error)
                    reject(error);

                resolve(multipleMongooseToObject(coachTrips));
            });
        });
    }

    /**
     * 
     * @param {String} coachTripCode 
     * @returns
     */
    getCoachTrip(coachTripCode) {
        return new Promise((resolve, reject) => {
            coachTrips.findOne({ code: coachTripCode }, function (error, coachTrip) {
                if (error)
                    reject(error);
                else if (coachTrip)
                    resolve(mongooseToObject(coachTrip));
                else
                    resolve(null);
            });
        });
    }

    /**
     * @param {CoachTrip} coachTrip
     * @return {Boolean}
     */
    createCoachTrip(item) {
        return new Promise((resolve, reject) => {
            let coachTrip = new CoachTrips(item);
            coachTrip.save()
                .then(() => resolve(true))
                .catch(error => reject(error));
            reject(false);
        });
    }

    updateCoachTrip(item){
        return new Promise((resolve, reject) => {
            coachTrips.findOne({ code: coachTripCode }, function (error, coachTrip) {
                if (error){
                    reject(error);
                }else if (coachTrip){
                    coachTrip.name = item.name;
                    coachTrip.departureTime = item.name;
                    coachTrip.save()
                        .then(() => resolve(true))
                        .catch(error => reject(error));
                }else{
                    resolve(false);
                }
            });
        });
    }
}



module.exports = new CoachTripDAO();