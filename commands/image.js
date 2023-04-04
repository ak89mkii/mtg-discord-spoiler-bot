const { SlashCommandBuilder } = require('discord.js');
// const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newmtg')
		.setDescription("Shows this year's (2023) MTG card spoilers."),
	async execute(interaction) {

        fetch("https://api.scryfall.com/cards/search?order=released&q=year=2023")
        .then(res => {
            return res.json();
        })
        .then( async test => {
            for(let i=0; i<5; i++) {
                let set = [test.data[i].set_name]
                console.log(set)
            }
                console.log(test.data[10].set_name)
            
                await interaction.reply('**Card Set:** ' + '\n' + test.data[10].set_name + '\n' + test.data[10].image_uris.large);

                // await interaction.reply('**Card Set:** ' + '\n' + set + '\n' + test.data[i].image_uris.large);
            // }
           
        });
	},
};