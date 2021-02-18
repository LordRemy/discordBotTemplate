module.exports = {
	name: 'ping',
    description: 'Pong!',

    //Are arguments required? [true/false]
    args: false, 
    //What arguments are required? [string]
    usage: '', 
    //Can this command be executed from DMs? [true/false]
    dmUse: true,
    //Can this command be executed from a server? [true/false]
    guildUse: true, 
    //Can this command only be executed in one channel? [channel name/false]
    channelLock: '📡terminal',
    //Cooldown amount in seconds [integer]
    cooldown: '2',
    //Can this command only be executed by a certain role? [role array/false]
    roles: ["Member","Admin"],
    //Command function [Do not change unless you know what you are doing]
	execute: main
};

async function main(message, args){
 
    //Command code goes here
    message.channel.send("Pong!");
  
}