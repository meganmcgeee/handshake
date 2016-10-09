import wipeSessionData from '../lib/wipeSessionData';

export default {
  botbuilder(session, next) {
    if (session.message.text === 'reset!') {
      session.send('Resetting!');
      wipeSessionData(session);
      session.reset();
    } else {
      next();
    }
  },
};
