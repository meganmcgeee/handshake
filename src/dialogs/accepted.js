export default session => {
  session.send('Hey! Looks like you both want to meet. Chat some more and arrange a meeting! Type "end" to finish.');
  session.beginDialog('/accepted-chat');
};
