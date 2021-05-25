require('dotenv').config();
const profileModel = require(`../../models/profileSchema`);

module.exports = async (Discord, client, message, member) => {
    if(message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id })
        if(!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                vctime: 0,
                messages: 0,
                money: 0
            });
            profile.save();
        };
    } catch(err) {
        console.log(err);
    };

    if(!profileData.money < 35000 && !message.member.roles.cache.some(r => r.name == 'active')) {
        let roleAdd = message.guild.roles.cache.find(r => r.name == 'active');

        message.guild.members.cache.get(message.author.id).roles.add(roleAdd).catch(console.error);

        let activeEmbed = new Discord.MessageEmbed()
        .setColor('#E5C222')
        .setTitle(`congratulations ${message.author.username}`)
        .setDescription("you've been awarded the `active` role for reaching 35000 ◊");

        message.channel.send(activeEmbed).then(activeEmbed => {
            setTimeout(() => {
                activeEmbed.delete();
            }, 10000);
        });
    };

    let prefix = (process.env.PREFIX);

    if(!message.content.startsWith(prefix)) {
        let response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, 
        {
            $inc: {
                messages: 1,
                money: 50,
            },
        },
        ); 
        return;
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(client, message, args, Discord, profileData)
}