import updatePrivateConversationData from '../lib/updatePrivateConversationData';

export default [
  (session, { matchAddress, matchId, myId, myName }) => {
    updatePrivateConversationData(session, { matchAddress, matchId, myId, myName });
    session.send("Hey! You've been matched! Now you can chat with your match anonymously.");
    session.send('If you decide you want to meet them, say "meet" at any time.');
    session.send('If you decide you *don\'t* want to meet them, say "pass".');
    session.beginDialog('/chat');
  },
];
