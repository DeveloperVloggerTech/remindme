const snekfetch = require('snekfetch');

exports.create = async (Bot, guild) => {
    const message = `Thanks for adding me to your server! To see a list of my commands, send \`${Bot.config.defaultPrefix}help\`.\nFeel free to DM Aetheryx#2222 for any questions or concerns!`;
    try {
        await guild.owner.send(message);
    } catch (e) {
        //
    }
    postStats(Bot);
};

exports.delete = async (Bot, guild) => {
    await Bot.db.run('DELETE FROM prefixes WHERE guildID = ?;', guild.id);
    Bot.prefixes.delete(guild.id);
    postStats(Bot);
};

function postStats (Bot) {
    for (const [url, token] of Bot.botlists) {
        if (url) {
            snekfetch
                .post(url)
                .set('Authorization', token)
                .send({ server_count: Bot.client.guilds.size })
                .end();
        }
    }
}
