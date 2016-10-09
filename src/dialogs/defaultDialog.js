import get from 'lodash/fp/get';

export default session => {
  console.log(get('message.address', session));
  if (session.userData.name) {
    return session.send(`Hey ${session.userData.name}! I'm working to find a match for you now.`);
  }
  return session.beginDialog('/onboarding');
};
