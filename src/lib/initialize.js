import builder from 'botbuilder';
import restify from 'restify';

//= ========================================================
// Bot Setup
//= ========================================================

// Create chat bot
export const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
});
// export const connector = new builder.ConsoleConnector().listen();

// Setup Restify Server
export const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());

export const bot = new builder.UniversalBot(connector, {
  persistConversationData: true,
});
