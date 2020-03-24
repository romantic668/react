var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength:3
    },
    password:{ type: String, required: true},
    bugs: [{ type: Schema.Types.ObjectId, ref: 'Bug' }]

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

User.addBug = addBug;

function addBug(userId, bugId){
    return User.findById(userId, function(err, user){
        if (err) return handleError(err);
        user.bugs.push(bugId);
        user.save();
    })

}
module.exports = User;