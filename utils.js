const { DiscordAPIError } = require("discord.js")

const Discord = require("discord.js");

module.exports = {
    simpleEmbed,
    listEmbed,
    getRandomIntInclusive
}

function simpleEmbed(context, text){
    
    const message = new Discord.MessageEmbed()
    message.addField(context, text, false)
    switch (context.toLowerCase()) {
        case "error":
            message.setColor('#a83c32')
            break;
        case "success":
            message.setColor('#32a852')
        default:
            break;
    }
    return(message)
}

function listEmbed(context, description, array){
  const message = new Discord.MessageEmbed()
  switch (context.toLowerCase()) {
        case "error":
            message.setColor('#a83c32')
            break;
        case "success":
            message.setColor('#32a852')
        default:
            break;
  }

  if(description){message.setDescription(description)}
  console.log("Description: " + description)

  message.setTitle(context)
  for(const item in array){
    console.log(array[item])
    message.addField("\u200B", array[item], false)
  }

  return message;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}