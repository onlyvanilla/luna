// eslint-disable-next-line no-unused-vars
const { CommandInteraction, GuildMember, EmbedBuilder,
    ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { after_dark } = require('../../colors.json');


module.exports = {

    name: 'user banner',
    /** @param {CommandInteraction} interaction */
    run: async interaction => {

        /** @type {GuildMember} */
        const pessoa = interaction.options.getMember('pessoa') || interaction.member;
        const row = new ActionRowBuilder();

        const { user } = pessoa;

        await user.fetch();

        if (user.banner) {

            const embed = new EmbedBuilder()
                .setColor(after_dark)
                .setDescription(`Banner de ${pessoa.displayName}`)
                .setImage(user.bannerURL({ size: 4096 }));


            interaction.reply(
                {
                    embeds: [ embed ],
                    components: [
                        row.addComponents(
                            new ButtonBuilder()
                                .setLabel(`Banner de ${pessoa.displayName}`)
                                .setStyle(ButtonStyle.Link)
                                .setURL(user.bannerURL({ size: 4096 }))
                        )
                    ]
                }
            );

            return;

        }

        interaction.reply({ content: `${pessoa.displayName} não parecer ter um banner` });


    }
};
