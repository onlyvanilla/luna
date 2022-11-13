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

            if (!cmd) return await interaction.reply({ content: `Parece que o comando </${cmd}:10023> não está em minha lista de comandos!\nPara saber quais comandos você pode usar, utilize </help:232323>` });

            cmd.run(interaction)
            console.log(`[${interaction.commandName}] - ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id})`) 

        }

    }
};
