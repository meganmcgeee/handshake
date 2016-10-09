import { Event, User } from '../lib/getModels';

import builder from 'botbuilder';
import displayInterests from 'arrford';
import joinLines from '../lib/joinLines';
import keyBy from 'lodash/fp/keyBy';
import parseInterests from '../lib/parseInterests';
import updateConversationData from '../lib/updateConversationData';
import updateUserData from '../lib/updateUserData';

export default [
  session => {
    session.send("Hey! I'm Handshake. I'm here to help you meet the people you really want to meet at events.");
    builder.Prompts.text(session, "What's your first name?");
  },
  (session, results) => {
    updateUserData(session, { name: results.response });
    Event.find({}).then(events => {
      updateConversationData(session, { events });
      builder.Prompts.choice(session, 'And what event are you at now?', keyBy('name', events));
    });
  },
  (session, results) => {
    const { events } = session.conversationData;
    const eventId = events[results.response.index]._id;
    updateUserData(session, { eventId });
    builder.Prompts.text(
      session,
      joinLines(
        `${results.response.entity}? Sick. And what are you interested in talking about today?`,
        '(Make it easy for me: give me a comma-separated list of interests, please!)'
      )
    );
  },
  (session, results) => {
    const interestsList = parseInterests(results.response);
    updateUserData(session, { interests: interestsList });
    const interests = displayInterests(interestsList);

    createUser(session)
    .then(console.log)
    .catch(console.error);

    session.endDialog(`Awesome. We'll find someone for you to chat about ${interests} with!`);
  },
];

function createUser(session) {
  const user = new User({
    address: session.message.address,
    eventId: session.userData.eventId,
    inConversation: false,
    interests: session.userData.interests,
    name: session.userData.name,
  });

  return user.save();
}
