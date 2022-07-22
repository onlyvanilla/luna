// eslint-disable-next-line no-unused-vars
const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');
const { User: usr, Subcommand: sub } = ApplicationCommandOptionType;


module.exports = {
    base: true,
    name: 'user',
    description: 'Info de alguém',
    options: [
        {
            type: sub,
            name: 'avatar',
            description: 'Veja o avatar de alguém',
            options: [
                {
                    type: usr,
                    name: 'pessoa',
                    description: 'Pessoa para ver o avatar',
                }
            ]
        },
        {
            type: sub,
            name: 'banner',
            description: 'Veja o banner de alguém',
            options: [
                {
                    type: usr,
                    name: 'pessoa',
                    description: 'Pessoa para ver o banner',
                }
            ]
        }
    ],

};
