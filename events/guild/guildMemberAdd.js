const { GuildMember } = require("discord.js");
const profileModel = require(`../../models/profileSchema`);

module.exports = async (client, Discord, member) => {

    let roleAdd = member.guild.roles.cache.find(r => r.name == 'randoms');
    member.roles.add(roleAdd).catch(console.error);

    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        vctime: 0,
        messages: 0,
        money: 0
    });
    profile.save();
};