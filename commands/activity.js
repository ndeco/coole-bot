const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'activity',
    aliases: ['a', 'act'],
    description: 'see your activity on the server',
    async execute(client, message, args, Discord, profileData) {

        message.delete();

        var time = profileData.vctime

        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        var hours = Math.floor(time / 3600);
        time = time - hours * 3600;

        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);
        };
        
        var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        let activityEmbed = new Discord.MessageEmbed()
        .setColor('#E5C222')
        .setTitle(`${message.author.username}'s Activity`)
        .addFields(
            {name: 'Messages sent:', value: `>>> ${profileData.messages}`, inline: true},
            {name: 'VC time:', value: `>>> ${finalTime}`, inline: true},
            {name: 'Activity points [◊]:', value: `>>> ${profileData.money}`},
        )
        .setFooter('coole bot');

        message.channel.send(activityEmbed).then(activityEmbed => {
            setTimeout(() => {
                activityEmbed.delete();
            }, 60000);
            
        });
    },
};