// eslint-disable-next-line no-unused-vars
const { CommandInteraction, GuildMember, EmbedBuilder,
    ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { after_dark } = require('../../colors.json');

module.exports = {

    name: 'user avatar',
    /** @param {CommandInteraction} interaction */
    run: async interaction => {

        /** @type {GuildMember} */
        const pessoa = interaction.options.getMember('pessoa') || interaction.member;
        const tamanhoImg = { size: 4096 };
        const row = new ActionRowBuilder();

        if (pessoa.avatar) {

            // A pessoa tem avatar diferente dentro e fora do server
            const avatarGuild = pessoa.displayAvatarURL(tamanhoImg);
            const avatarGlobal = pessoa.user.displayAvatarURL(tamanhoImg);

            const [ embedAvatarGuild, embedAvatarGlobal ] = [ avatarGuild, avatarGlobal ]
                .map(url => new EmbedBuilder()
                    .setImage(url)
                    .setColor(after_dark)
                );

            embedAvatarGuild.setDescription(`Avatar de ${pessoa.displayName} nesse server`);
            embedAvatarGlobal.setDescription(`Avatar de ${pessoa.displayName} fora daqui`);

            await interaction.reply({
                embeds: [
                    embedAvatarGuild,
                    embedAvatarGlobal
                ],
                components: [
                    row.addComponents(
                        new ButtonBuilder()
                            .setLabel('Avatar nessa guild')
                            .setStyle(ButtonStyle.Link)
                            .setURL(avatarGuild),
                        new ButtonBuilder()
                            .setLabel('Avatar global')
                            .setStyle(ButtonStyle.Link)
                            .setURL(avatarGlobal)
                    )
                ]
            });

            return;
        }

        const embed = new EmbedBuilder()
            .setColor(after_dark)
            .setDescription(`Avatar de ${pessoa.displayName} nesse server`)
            .setImage(pessoa.displayAvatarURL(tamanhoImg));

        interaction.reply(
            {
                embeds: [ embed ],
                components: [
                    row.addComponents(
                        new ButtonBuilder()
                            .setLabel('Avatar nessa guild')
                            .setStyle(ButtonStyle.Link)
                            .setURL(pessoa.displayAvatarURL(tamanhoImg))
                    )
                ]
            }
        );

    }
};
