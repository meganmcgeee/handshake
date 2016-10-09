export default function wipeSessionData(session) {
  /* eslint-disable */
  session.userData = {};
  session.perUserInConversationData = {};
  session.conversationData = {};
  session.privateConversationData = {};
  session.dialogData = {};
  /* eslint-enable */
}
