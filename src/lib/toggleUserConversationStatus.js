import { User } from './getModels';

export default function toggleUserConversationStatus(...userIds) {
  return User.remove(userIds).then(console.log).catch(console.error);
}
