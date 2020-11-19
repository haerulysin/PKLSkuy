const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;
defaultPhotoURL = ['default.png']

const projectSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
    },

    projectCategory:{
        type: Number,
        required: true,
        default: 1
    },

    projectName: {
        type: String,
        required: true,
        default: 'Proyek Saya',
    },

    projectDescription:{
        type: String,
        required: true,
        default: 'My Project'
    },
    
    location:{
        geoLocation:Array,
        address:{
            type: [String],
            required:true,
        }

    },

    projectDeadline:{
        type: Date,
        default: Date.now(),
        required:true
    },

    photoURL: {
        type: Array,
        required:true,
        default: defaultPhotoURL
        
    },

    projectBudget: {
        type: Array,
        default: [20000,300000],
        required:true
    },

    postedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },

    onProgress:{
        status:{
            type:Boolean,
            required:true,
            default:false,
        },
        proposalID:{
            type:String,
            default:null,
            ref:'projectProposal'
        }
    },

    projectDoneStatus:{
        type:Boolean,
        required:true,
        default:false,
    }
},{
    collection: 'projectList',
}
);

projectSchema.index({'$**':'regex'});

module.exports = mongoose.model("projectList", projectSchema);