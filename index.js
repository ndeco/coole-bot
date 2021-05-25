const Discord = require('discord.js');
const client = new Discord.Client();

const profileModel = require(`./models/profileSchema`);

const fs = require('fs');
const mongoose = require('mongoose');

const memberCount = require('./counters/memberCount')

require('dotenv').config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandhandler', 'eventhandler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord)
});

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    userFindAndModify: false,
  })
  .then(() => {
    console.log('connected database');
  })
  .catch((err) => {
    console.log(err);
  });

  client.on('ready', () => {
    setInterval(() => {
      client.user.setActivity('the Stats | .help', {type: 'WATCHING'})
  }, 5000)
    memberCount(client)
  })

client.login(process.env.TOKEN);