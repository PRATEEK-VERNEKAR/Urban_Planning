import mongoose, { Schema } from 'mongoose'

const eventSchema = mongoose.Schema({
  //  info , danger
  eventType: {
    type: String,
    required: [true, 'Event Type mandatory'],
  },
  message: {
    type: String,
    required: [true, 'Event should contain the message is required'],
  },
  
})

const Event = mongoose.models.events || mongoose.model('events', eventSchema)

export default Event
