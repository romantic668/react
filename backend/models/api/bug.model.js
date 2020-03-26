var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bugSchema = new Schema({
    username: { type: Schema.Types.ObjectId, ref: 'User' },
    title:{ type: String, required: true},
    description: { type: String, required: true},
    priority:   {   type: String,
                    enum: ['URGENT', 'COMMON', 'LOW'],
                    default: 'COMMON',
                    required: true
                },
    deadline: { type: Date, required:true},
    finished: { type: Boolean, reuired:true ,default: false}
  
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;