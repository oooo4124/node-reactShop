const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type : String,
        trim: true, // 공백이 있을 경우 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number,
    }
})


userSchema.pre('save', function(next){// save 전에 function 지정
    var user = this;

    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {// Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){

    // plainPassword 와 암호화된 비밀번호 같은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)

    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;


    //jsonwebtoken을 이용해서 토큰 생성
    // user._id + 'secretToken' 해서 토큰을 만든다. 
    //나중에 'secretToken'을 통해 이 토큰의 user._id를 확인할 수 있다. 
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb){
    var user = this;

    //토큰을 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 후 클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인
        
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User} // 다른 곳에서도 사용가능하게 하기 위해 exports