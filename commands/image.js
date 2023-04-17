const { SlashCommandBuilder } = require('discord.js');
const cron = require("cron");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newmtg')
		.setDescription("Shows this year's (2023) MTG card spoilers."),
	async execute(interaction) {
        // let initAutoSend01 = new cron.CronJob('00 22 13,15 * * *', () => {
            interaction.deferReply();
            setInterval(() => {
            fetch("https://api.scryfall.com/cards/search?order=released&q=year=2023")
            .then(res => {
                return res.json();
            })
            .then( async aPIData => { 
                let dataSet = []
                let dataImg = []
                for(let i=0; i<5; i++) {
                    dataSet.push( '\n' + '**Card Set:** ' + '\n' + aPIData.data[i].set_name)
                    dataSet.push( '\n' + '**Card Image Link:** ' + '\n' + aPIData.data[i].image_uris.large)

                }
                console.log(aPIData.data[0].set_name)
                console.log(aPIData.data[0].set_name)

                await interaction.followUp(dataSet + '\n' + dataImg + '\n');
                // await interaction.editReply("Test!");

            });
        }, 10000) 
        // });
        // initAutoSend01.start();
        // // console.log("Initialized Automation.")
        // setTimeout(() => {
        //     console.log("Shedule is running");
        //     console.log("What?")

        // }, 3000) 
	},
};
