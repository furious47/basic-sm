const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'pls provide name'],
        minlength : 3,
        maxlength : 50
    },
    email:{
        type:String,
        required:[true, 'pls provide email'],
        trim:true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'pls provide email'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'pls provide password']
    }

})

schema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

schema.methods.tokenCreate = function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
}

schema.methods.checkPass = async function(password){
    const comparepass = await bcrypt.compare(password,this.password)
    return comparepass
}


module.exports = mongoose.model('login',schema)