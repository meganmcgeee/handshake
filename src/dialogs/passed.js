import toggleUserConversationStatus from '../lib/toggleUserConversationStatus';

export default session => {
  const { matchId, myId } = session.privateConversationData;
  toggleUserConversationStatus(myId, matchId);
  session.send("Sorry to break it to you, but your match doesn't want to meet. Better luck next time!");
};
