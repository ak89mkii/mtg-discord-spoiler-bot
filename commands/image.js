const { SlashCommandBuilder } = require('discord.js');
const cron = require("cron");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newmtg')
		.setDescription("Shows this year's (2023) MTG card spoilers."),
	async execute(interaction) {
        let initAutoSend01 = new cron.CronJob('00 32 02,15 * * *', () => {

            fetch("https://api.scryfall.com/cards/search?order=released&q=year=2023")
            .then(res => {
                return res.json();
            })
            .then( async aPIData => { 
                let dataSet = []
                let dataImg = []
                for(let i=0; i<2; i++) {
                    dataSet.push( '\n' + '**Card Set:** ' + '\n' + aPIData.data[i].set_name)
                    dataSet.push( '\n' + '**Card Image Link:** ' + '\n' + aPIData.data[i].image_uris.large)

                }
                console.log(aPIData.data[0].set_name)
                console.log(aPIData.data[0].set_name)

                // await interaction.reply(dataSet + '\n' + dataImg + '\n');
                await interaction.reply("Test!");

            });
        });
        initAutoSend01.start();
        console.log("Initialized Automation.")
        // console.log(dataSet)

	},
};
