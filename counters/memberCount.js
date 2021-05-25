module.exports = async (client) => {

    let guild = client.guilds.cache.find(g => g.name == 'bot showcase');

    setInterval(() => {

        let memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        let memberCountChannel = guild.channels.cache.get('846346797349470228');

        memberCountChannel.setName(`${memberCount} members`);
    }, 30000);
};