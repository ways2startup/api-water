/* Booking API class is just an interface for Business Logic. Primarly Used for preparing context object for model class rather directly passing express object as it restricts the testabilty.
    For Additional Reference why interface layer need Please Refer the link
    https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/createlayers.md
    Example : if you want to pluck any data by id: prepare context object from request and pass context object to model class. so it can be unit tested
    userContextobject : {
        userId : req.id
    }
*/
let BookingModel = require('./booking-model')
const ErrorHandler = require('../../services/error-handler/error-handler')
const errorHandler = ErrorHandler.instance
class BookingAPI extends BookingModel {
  constructor (options) {
    super(options)
    this.options = options
  }
  /**
   * @description Booking model web layer handler for getting initial can data on application load
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  getCanData (request, response, next) {
    let self = this
    super.getCanData().then(data => {
      response.json(data)
      // self.alwaysThrowError(request)
    }).catch(function (err) {
      next(err)
    })
  }

  /**
   * Dummy Error Function to test error logging in middleware function will remove later
   */
  alwaysThrowError (request) {
    let errorData = {
      data: {'hi': 'error'},
      severity: errorHandler.getSeverity().HIGH,
      level: errorHandler.getLoggerLevel.info,
      isOperational: false,
      route: request.originalUrl
    }
    throw new Error(errorHandler.sendError(errorData))
    // throw new Error(errorData)
  }
}
module.exports = BookingAPI
