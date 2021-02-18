const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

const main = function(message) {

    //---BASIC CHECKS---//-------------------------------------------------------------------------------------------------------------------
    //These are checks that should always be implemented to prevent recursion and misuse.


    //Check if message was sent by a bot
    if (message.author.bot) return;  

    //Check for prefix
    if (!message.content.startsWith(config.prefix)) return;

    //Escape text:
    //Remove prefix and store each word in an array
    const args = message.content.slice(config.prefix.length).split(/ +/);
    //remove the first element of that array and store it in another variable
    const commandName = args.shift().toLowerCase();                         

    //Check if command exists
    if (!commands.includes(commandName + ".js")) return;
    //Instantiate respective command
    const command = require('./commands/' + commandName + '.js')            

    //---COMMAND-SPECIFIED CHECKS---//-------------------------------------------------------------------------------------------------------
    //These are checks which can be customised based on your needs. Set conditions in the command files and check for them in this section.

    //Check if the command can be executed in DMs
    if ( (message.channel.type == 'dm') && !command.dmUse ){
        throw ("This command can not be executed in DMs.");
    }

    //Check if the command can be executed on a server
    if ( (message.channel.type == 'text') && !command.guildUse) {
        throw ("This command cannot be executed from a server.");
    }
    
    //Check command channel restriction
    if ( (command.channelLock != false) && (command.channelLock != message.channel.name) ) {
        throw ("This command can only be executed in " + command.channelLock);
    }

    //Check if the user has one of the roles required
    if (command.roles != false){
        if(!command.roles.some(function(i){
            if (message.member.roles.cache.some(role => role.name == i)) return true;
        })){
            throw("You lack the permission required to execute this command")
        }   
    }
    
    //Check if the required arguments are provided
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
        reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        }
        throw (reply);
    }

    //---COOLDOWN CHECK---//--------------------------------------------------------------------------------------------------------------

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        throw (`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }


    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //---EXECUTION---//------------------------------------------------------------------------------------------------------------------

    try {
        command.execute(message, args)
        return;
    } catch (error) {
        console.log(error);
        throw ("Unknown Error:\n" + error);
    }
}

module.exports = main