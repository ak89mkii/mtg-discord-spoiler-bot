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
            let dataSet = []
            let dataImg = []
            for(let i=10; i<15; i++) {
                dataSet.push( '\n' + '**Card Set:** ' + '\n' + test.data[i].set_name)
                console.log(dataSet)
                dataSet.push( '\n' + '**Card Image Link:** ' + '\n' + test.data[i].image_uris.large)

            }
                console.log(test.data[10].set_name)
            
                await interaction.reply(dataSet + '\n' + dataImg + '\n');

                // await interaction.reply('**Card Set:** ' + '\n' + set + '\n' + test.data[i].image_uris.large);
            // }
           
        });
	},
};