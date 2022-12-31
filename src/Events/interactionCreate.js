import Permission from "../Utils/Permission.js";

export default class {
  constructor(client) {
    this.client = client;
  }
  async execute(interaction) {
    const client = this.client;

    const commandName = interaction.commandName;
    const commands = client.interactionCommands;
    const command = commands.get(commandName);

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
      };
      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }

    try {
      command.execute(interaction, client);
    } catch (err) {
      console.log(err);
    }
  }
}
