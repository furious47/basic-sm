const customApiError = require('./customApiEr')

class notFound extends customApiError{
   constructor(message,statusCode){
    super(message)
    this.statusCode = 404
   }
}

module.exports = notFound