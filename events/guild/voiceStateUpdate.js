const profileModel = require(`../../models/profileSchema`);

module.exports = async (client, Discord, oldState, newState) => {


    if(!oldState.channel && newState.channel.id !== undefined && newState.mute == false || oldState.mute == true && newState.mute == false) {
        console.log('started time interval');

        let intervalObj = setInterval(async () => {

            if(!newState.channel || newState.mute == true) {
                console.log('cleared time interval')
                clearInterval(intervalObj);
            };

            let response = await profileModel.findOneAndUpdate({
                userID: newState.id,
                }, 
                {
                    $inc: {
                        vctime: 1,
                        money: 1,
                    },
                },
            );
            
        }, 1000);
    }
};