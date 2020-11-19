const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const userReview = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },

    from:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    
    to:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'

    },

    comments:{
        type:String,
        required:true,
        default:' '
    },

    rating:{
        type: mongoose.Decimal128,

    },

    project:{
        type: String,
        required:true,
        ref:'projectList'
    },

    dateSubmitted:{
        type: Date,
        default: Date.now,
    }
   

}, {
    collection: 'userReview',
}
);



module.exports = mongoose.model("userReview", userReview);