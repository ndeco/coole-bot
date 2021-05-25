const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'shop',
    aliases: ['s'],
    description: 'buy things',
    async execute(client, message, args, Discord, profileData) {

        if(!args[0]) {
            let shopEmbed = new Discord.MessageEmbed()
            .setColor('#E5C222')
            .setTitle('shop')
            .setDescription(`you have ${profileData.money} activity points [◊]`)
            .addFields(
                {name: 'custom role', value: '>>> 100000 ◊\n`.shop custom <name> <#hex>`'}
                //{name: 'rainbow role', value: '>>> 250000 ◊\n`.shop rainbow`'}
            )
            .setFooter('coole bot');

            message.channel.send(shopEmbed).then(shopEmbed => {
                setTimeout(() => {
                    shopEmbed.delete();
                    message.delete();
                }, 180000);
            });
            return;
        };
        //#region ----- custom role -----
        if(message.content.startsWith('.s' || '.shop') && message.content.includes('custom')) {

            if(profileData.money < 100000) {

                message.delete();

                let missingMoney = 100000 - profileData.money;
                message.channel.send(`you are missing ${missingMoney} activity points`).then(message => {
                    setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
                return;
            };

            if(!args[1]) {

                message.delete();

                message.channel.send('please enter a name for the role').then(message => {
                    setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
                return;
            };

            if(!args[2] || !args[2].startsWith === '#' || !args[2].length === 7) {

                message.delete();

                message.channel.send('please enter a valid hex colour for the role (with the hashtag)').then(message => {
                    setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
                return;
            };

            message.delete();

            let roleName = args[1];

            let roleHex = args[2];

            let confirmEmbed = new Discord.MessageEmbed()
            .setColor(`${roleHex}`)
            .setTitle('is this the role you want? (y/n)')
            .addFields(
                {name: 'role name', value: `>>> ${roleName}`},
                {name: 'role colour (sidebar)', value: `>>> ${roleHex}`}
            )
            .setFooter('if the bar is black, something went wrong');

            message.channel.send(confirmEmbed).then(confirmEmbed => {
                setTimeout(() => {
                    confirmEmbed.delete()
                }, 60000)
            })

            let filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            }).then(async message => {

                message = message.first();

                if(message.content.toLowerCase() == 'n' || message.content.toLowerCase() == 'no') {

                    message.delete();

                    message.channel.send('custom role cancelled').then(message => {
                        setTimeout(() => {
                            message.delete();
                        }, 5000);
                    });
                }

                else if(message.content.toLowerCase() == 'y' || message.content.toLowerCase() == 'yes') {

                    let response = await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                    }, 
                    {
                        $inc: {
                            money: -100000,
                        },
                    },
                    ).catch(console.error);
                
                    message.guild.roles.create({
                        data: {
                            name: `${roleName}`,
                            color: `${roleHex}`,
                        },
                    }).catch(console.error);

                    setTimeout(() => {
                        let roleAdd = message.guild.roles.cache.find(r => r.name === `${roleName}`);

                        message.guild.members.cache.get(message.author.id).roles.add(roleAdd).catch(console.error);

                        message.channel.send('role succesfully added!').then(message => {
                            setTimeout(() => {
                                message.delete();
                            }, 5000);
                        });
                    }, 5000);
                }

                else {
                    message.channel.send('invalid response').then(message => {
                        setTimeout(() => {
                            message.delete();
                        }, 5000);
                    });
                };
            }).catch(() => {
                console.log('custom role cancelled; timed out')

                message.channel.send('custom role cancelled; you took too long').then(message => {
                    return setTimeout(() => {
                        message.delete();
                    }, 5000);
                });
            });
        };
        //#endregion
    },
};