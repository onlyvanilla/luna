// eslint-disable-next-line no-unused-vars
const { BaseInteraction, InteractionType } = require('discord.js');

module.exports = {
    
    name: 'interactionCreate',
    /** @param {BaseInteraction} interaction*/
    execute: async (interaction) => {

        if (interaction.isChatInputCommand()) {

            const sub = interaction.options.getSubcommand(false);
            const cmdNome = sub ? `${interaction.commandName} ${sub}` : interaction.commandName;

            const cmd = interaction.client.commands.get(cmdNome);

            if (!cmd) return await interaction.reply({ content: `Comando ${cmd} não encontrado` });

            cmd.run(interaction);

        }

    }
};
