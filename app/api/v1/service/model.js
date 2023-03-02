const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema(
   {
    title: {
        type: String,

    },
    statusService: {
        type: String,
        enum: [Draft, Published],
        default: 'Draft'
    },
    Image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true
    }
   },
   {timestamps: true}
)

module.exports = mongoose.model('Service', ServiceSchema)