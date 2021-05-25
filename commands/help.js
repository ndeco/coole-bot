module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'help menu',
    execute(client, message, args, Discord) {

        message.delete();
        
        let helpEmbed = new Discord.MessageEmbed()
        .setColor('#E5C222')
        .setTitle('help menu')
        .addFields(
            {name: '`.help [.h]`', value: '>>> displays this', inline: true},
            {name: '`.activity [.a]`', value: '>>> displays your activity', inline: true},
            {name: '`.shop [.s]`', value: '>>> buy custom roles', inline: true}
        )
        .setFooter('coole bot');

        message.channel.send(helpEmbed).then(helpEmbed => {
            setTimeout(() => {
                helpEmbed.delete();
            }, 180000);
        });
    },
};