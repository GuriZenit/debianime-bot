export default class {
  constructor() {
    this.data = {
      name: "stop",
      description: "turn of the bot",
      aliases: ["parar", "stop"],
      permissionsUser: ["Administrator"],
      permissionsBot: ["ViewChannel", "ManageMessages"],
    };
  }
  async execute(message, args, client) {
    message.delete();
    await message.member.send(`> ${client.user.tag} OFF!`);
    process.exit(1);
  }
}
