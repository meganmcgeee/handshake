import accepted from './dialogs/accepted';
import acceptedChat from './dialogs/acceptedChat';
import { bot } from './lib/initialize';
import chat from './dialogs/chat';
import confirmMeeting from './dialogs/confirmMeeting';
import defaultDialog from './dialogs/defaultDialog';
import done from './dialogs/done';
import findMatches from './lib/findMatches';
import matched from './dialogs/matched';
import meet from './dialogs/meet';
import onboarding from './dialogs/onboarding';
import pass from './dialogs/pass';
import passed from './dialogs/passed';
import wipeSession from './middleware/wipeSession';

//= ========================================================
// Bots Dialogs
//= ========================================================

bot.use(wipeSession);
bot.dialog('/', defaultDialog);
bot.dialog('/onboarding', onboarding);
bot.dialog('/matched', matched);
bot.dialog('/chat', chat);
bot.dialog('/pass', pass);
bot.dialog('/passed', passed);
bot.dialog('/meet', meet);
bot.dialog('/confirm-meeting', confirmMeeting);
bot.dialog('/accepted', accepted);
bot.dialog('/accepted-chat', acceptedChat);
bot.dialog('/done', done);

// Poll for matches every 10 seconds
const seconds = n => n * 1000;
setInterval(findMatches, seconds(10));
findMatches();
