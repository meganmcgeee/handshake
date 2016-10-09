export default function updateDialogData(session, updates) {
  // eslint-disable-next-line
  session.dialogData = {
    ...session.dialogData,
    ...updates,
  };
}
