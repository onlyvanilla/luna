// eslint-disable-next-line no-unused-vars
const { CommandInteraction } = require('discord.js');


module.exports = {
    name: 'ping',
    description: 'Ping',

    /** @param {CommandInteraction} interaction */
    run: interaction => {

        interaction.reply({ content: `Meu ping é ${interaction.client.ws.ping}` });

    }
};
