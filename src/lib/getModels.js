import Bluebird from 'bluebird';
import mongoose from 'mongoose';

// eslint-disable-next-line
mongoose.Promise = Bluebird;

// Initialize database
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('database is connected'));

const userSchema = mongoose.Schema({
  address: Object,
  eventId: String,
  inConversation: Boolean,
  interests: Array,
  matchId: String,
  name: String,
});

const eventSchema = mongoose.Schema({
  name: String,
});

export const User = mongoose.model('User', userSchema);
export const Event = mongoose.model('Event', eventSchema);
