const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },

    proposalBudget: {
        type: Number,
        required: true,
        default: 1
    },

    proposalDescription: {
        type: String,
        required: true,
        default: 'Proposal Saya',
    },
    proposalAcceptedStatus:{
        type:Boolean,
        required:true,
        default:false,
    },
    projectID: {
        type: String,
        required: true,
        ref:'projectList'
    },
    proposalBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }

}, {
    collection: 'projectProposal',
}
);



module.exports = mongoose.model("projectProposal", proposalSchema);