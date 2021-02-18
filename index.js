const Discord = require('discord.js');
const config = require('./config.json');
const utils = require('./utils')
const messageHandler = require('./messageHandler')

//Instantiate the client (aka the bot)
const client = new Discord.Client();

//Let us know when initialisation is complete
client.once('ready', () =>{
    console.log('Ready');
});

client.on('message', message => {

    if(message.author.bot) return;

    try{
        messageHandler(message)
    }
    catch(error){
        message.channel.send(utils.simpleEmbed("Error", error))
    }
});

//Connect to discord using the token specified in .env
client.login(config.token);