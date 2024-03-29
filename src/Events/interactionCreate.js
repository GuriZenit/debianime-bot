import Permission from "../Utils/Permission.js";

export default class {
  constructor() {
    this.once = false;
  }
  async execute(interaction) {
    const { client, commandName } = interaction;
    const commands = client.interactionCommands;
    const command = commands.get(commandName);
    
    client.database.ensure(interaction.guild.id);

    if (!command) return;

    const permission = new Permission()
      .setNeeded(command.data.permissions)
      .setChannel(interaction.channel)
      .setMemberId(client.user.id);
    const missing = await permission.getMissing();

    if (missing) {
      const embed = {
        title: "Missing Permissions",
        description: missing.join("\n"),
        color: client.color.int.red,
        footer: { text: `For ${client.user.tag}` },
      };
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
    command.execute(interaction, client);
  }
}
