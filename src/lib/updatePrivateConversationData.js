export default function updatePrivateConversationData(session, update) {
  // eslint-disable-next-line
  session.privateConversationData = {
    ...session.privateConversationData,
    ...update,
  };
}
