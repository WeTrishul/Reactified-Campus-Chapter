const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.ObjectId
    },

    reportable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    
    onModel: {
        type: String,
        required: true,
        enum: ['post', 'comment']
    }
}, {
    timestamps: true
});


const Report = mongoose.model('Report', reportSchema);
module.exports = Report;