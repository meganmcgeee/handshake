export default function updateConversationData(session, update) {
  // eslint-disable-next-line
  session.conversationData = {
    ...session.conversationData,
    ...update,
  };
}
