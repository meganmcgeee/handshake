import { bot } from './lib/initialize';
import builder from 'botbuilder';
import defaultDialog from './dialogs/defaultDialog';
import findMatches from './lib/findMatches';
import onboarding from './dialogs/onboarding';
import toggleUserConversationStatus from './lib/toggleUserConversationStatus';
import updatePrivateConversationData from './lib/updatePrivateConversationData';
import wipeSessionData from './lib/wipeSessionData';

//= ========================================================
// Bots Dialogs
//= ========================================================

bot.use({
  botbuilder(session, next) {
    if (session.message.text === '💩') {
      session.send('Resetting!');
      wipeSessionData(session);
      session.reset();
    } else {
      next();
    }
  },
});


bot.dialog('/', defaultDialog);
bot.dialog('/onboarding', onboarding);
bot.dialog('/matched', [
  (session, { matchAddress, matchId, myId }) => {
    updatePrivateConversationData(session, { matchAddress, matchId, myId });
    session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
    session.send('If you decide you want to meet them, say "meet" at any time.');
    session.send('If you decide you *don\'t* want to meet them, say "pass".');
    session.beginDialog('/convo');
  },
]);
bot.dialog('/convo', [
  session => {
    builder.Prompts.text(session, 'Say something:');
  },
  (session, { response }) => {
    const { matchId, myId, matchAddress: otherUser } = session.privateConversationData;
    if (response.match(/^"?pass"?$/i)) {
      session.send("Okay, I'll unmatch you from this person.");
      const msg = new builder.Message()
        .address(otherUser)
        .text("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
      bot.send(msg);
      toggleUserConversationStatus(myId, matchId);
      session.endDialog();
    } else if (response.match(/^"?meet"?$/i)) {
      session.send("Okay, I'll let your match know you want to meet!");
      const msg = new builder.Message()
        .address(otherUser)
        .text('Hey, your match wants to meet. Are you down?');
      bot.send(msg);
    } else {
      const msg = new builder.Message()
        .address(otherUser)
        .text(`Your match said: ${response}`);
      bot.send(msg);
      session.beginDialog('/convo');
    }
  },
]);

const seconds = n => n * 1000;
setInterval(findMatches, seconds(10));
findMatches();
