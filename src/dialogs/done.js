import toggleUserConversationStatus from '../lib/toggleUserConversationStatus';

export default session => {
  const { myId } = session.privateConversationData;
  session.send('The conversation has ended. Glad I could connect you two!');
  toggleUserConversationStatus(myId);
};
