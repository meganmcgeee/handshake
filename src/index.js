import builder from 'botbuilder';
import mongoose from 'mongoose';
import restify from 'restify';

//= ========================================================
// Bot Setup
//= ========================================================

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Initialize database
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database didnt blow up yay');
  // Mongoose Schema
  const userSchema = mongoose.Schema({
    firstName: String,
    interests: Array,
    eventID: mongoose.Schema.Types.ObjectId,
  });

  // Mongoose model
  const user = mongoose.model('User', userSchema);
});


//= ========================================================
// Bots Dialogs
//= ========================================================

bot.dialog('/', (session) => {
  session.send('Hello World');
});
