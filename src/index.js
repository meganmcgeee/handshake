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
  (session, { matchAddress, matchId, myId, myName }) => {
    updatePrivateConversationData(session, { matchAddress, matchId, myId, myName });
    session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
    session.send('If you decide you want to meet them, say "meet" at any time.');
    session.send('If you decide you *don\'t* want to meet them, say "pass".');
    session.beginDialog('/convo');
  },
]);
bot.dialog('/convo', [
  session => {
    builder.Prompts.text(session, 'Say something!');
  },
  (session, { response }) => {
    const { matchAddress: otherUser } =
      session.privateConversationData;

    if (response.match(/^"?pass"?$/i)) {
      session.beginDialog('/pass');
    } else if (response.match(/^"?meet"?$/i)) {
      session.beginDialog('/meet');
    } else {
      const msg = new builder.Message()
        .address(otherUser)
        .text(`Your match said: ${response}`);
      bot.send(msg);
      session.beginDialog('/convo');
    }
  },
]);

bot.dialog('/pass', session => {
  const { matchAddress: otherUser } = session.privateConversationData;
  session.send("Okay, I'll unmatch you from this person.");
  bot.beginDialog(otherUser, '/passed');
});

bot.dialog('/passed', session => {
  const { matchId, myId } = session.privateConversationData;
  toggleUserConversationStatus(myId, matchId);
  session.send("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
});

bot.dialog('/meet', session => {
  const { matchAddress: otherUser } = session.privateConversationData;
  session.send("Okay, I'll let your match know you want to meet!");
  bot.beginDialog(otherUser, '/confirm-meeting');
});

bot.dialog('/confirm-meeting', [
  session => {
    builder.Prompts.confirm(session, 'Hey, your match wants to meet. Do you accept?');
  },
  (session, { response }) => {
    const { matchAddress: otherUser } = session.privateConversationData;
    if (response) {
      session.beginDialog('/accepted');
      bot.beginDialog(otherUser, '/accepted');
    } else {
      session.send("No worries! I'll let them know.");
      bot.beginDialog(otherUser, '/passed');
    }
  },
]);

bot.dialog('/accepted', session => {
  session.send('Hey! Looks like you both want to meet. Chat some more and arrange a meeting! Type "end" to finish.');
  session.beginDialog('/accepted-chat');
});

bot.dialog('/accepted-chat', [
  session => {
    builder.Prompts.text(session, 'Say something!');
  },
  (session, { response }) => {
    const { myName, matchAddress: otherUser } =
      session.privateConversationData;

    const msg = new builder.Message()
      .address(otherUser)
      .text(`${myName} said: ${response}`);
    bot.send(msg);
    session.beginDialog('/accepted-chat');
  },
]);

const seconds = n => n * 1000;
setInterval(findMatches, seconds(10));
findMatches();
