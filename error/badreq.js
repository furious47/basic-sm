const customApiError = require('./customApiEr');

class noAuth extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}

module.exports = noAuth