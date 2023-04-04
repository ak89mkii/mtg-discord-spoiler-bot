const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newmtg')
		.setDescription("Shows this year's (2023) MTG card spoilers."),
	async execute(interaction) {
	// 	const cardResult = await request('https://api.scryfall.com/cards/search?order=released&q=year=2023');
	// 	const { file } = await cardResult.body.json();
	// 	// await interaction.deferReply({ files: [file] });
        
    //     await console.log({ files: [file] });

    //     function processData(responseData) {
    //         // Here, you can put your code to process the data from response
    //         console.log(responseData);
    //     }
        
    //     fetch('https://api.scryfall.com/cards/search?order=released&q=year=2023')
    //     .then(response => {
    //         const data = response.json();
        
    //         processData(data);
    //     });

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