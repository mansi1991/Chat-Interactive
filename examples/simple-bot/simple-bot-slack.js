/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
    token: YOUR_SLACK_TOKEN
});

var watsonMiddleware = require('botkit-middleware-watson')({
  username: 7027a447-837b-4ccb-827a-4798a09ca0a0,
  password: G667oLABs4Kp,
  workspace_id: Y2d540c47-7de4-4dda-a306-7a39d21d3430,
  version_date: '2016-09-20',
  minimum_confidence: 0.50, // (Optional) Default is 0.75
});
slackController.middleware.receive.use(watsonMiddleware.receive);
slackBot.startRTM();

slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.reply(message, message.watsonData.output.text.join('\n'));
});
slackController.middleware.receive.use(middleware.receive);
slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  bot.reply(message, message.watsonData.output.text.join('\n'));
});
slackController.hears(['.*'], ['direct_message'], function(bot, message) {
  middleware.interpret(bot, message, function(err) {
    if (!err)
      bot.reply(message, message.watsonData.output.text.join('\n'));
  });
});
slackController.hears(['hello'], ['direct_message', 'direct_mention', 'mention'], watsonMiddleware.hear, function(bot, message) {

    bot.reply(message, message.watsonData.output.text.join('\n'));

    // now do something special related to the hello intent

});
slackController.changeEars(watsonMiddleware.hear);

slackController.hears(['hello'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    bot.reply(message, message.watsonData.output.text.join('\n'));

    // now do something special related to the hello intent
});
middleware.before = function(message, conversationPayload, callback) {
    // Code here gets executed before making the call to Conversation.
    callback(null, customizedPayload);
  }
middleware.after = function(message, conversationResponse, callback) {
    // Code here gets executed after the call to Conversation.
    callback(null, conversationResponse);
  }
require('dotenv').load();

var Botkit = require('botkit');
var express = require('express');
var middleware = require('botkit-middleware-watson')({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  workspace_id: process.env.WORKSPACE_ID,
  version_date: '2016-09-20'
});

// Configure your bot.
var slackController = Botkit.slackbot();
var slackBot = slackController.spawn({
  token: process.env.SLACK_TOKEN
});
slackController.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  slackController.log('Slack message received');
  middleware.interpret(bot, message, function(err) {
    if (!err)
		  bot.reply(message, message.watsonData.output.text.join('\n'));
	});
});

slackBot.startRTM();

// Create an Express app
var app = express();
var port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, function() {
  console.log('Client server listening on port ' + port);
});
