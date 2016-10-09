export default function updateUserData(session, updates) {
  // eslint-disable-next-line
  session.userData = {
    ...session.userData,
    ...updates,
  };
}
