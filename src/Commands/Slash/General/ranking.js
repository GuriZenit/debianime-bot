export default class {
  constructor() {
    this.data = {
      type: 1,
      name: "ranking",
      description: "shows user ranking per message sent",
      dm_permission: false,
    };
  }
  execute(interaction) {
    const { client, guild, user } = interaction;
    const { database, config } = client;

    if (!database.cache.get(guild.id)) return;

    const { members } = database.cache.get(guild.id);
    const ranking = [];
    const author = {};

    members.sort((a, b) => b.level - a.level);

    members.forEach((member, index) => {
      if (user.id == member.id) {
        author.level = member.level;
        author.position = index + 1;
      }

      if (member.level == 0) return;
      if (index >= 10) return;

      ranking.push(`#${index + 1} • ${member.name} • LVL: **${member.level}**`);
    });

    const embed = {
      title: `Ranking on ${guild.name}`,
      description: ranking.join("\n"),
      color: config.color.int.primary,
      footer: {
        text: `#${author.position} • ${user.username} • LVL: ${author.level}`,
        icon_url: user.avatarURL(),
      },
    };

    interaction.reply({ embeds: [embed] });
  }
}
