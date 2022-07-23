import { Command, CommandExecuteOptions } from '../../structures';
import type { Client } from '../../Client';
import { ApplicationCommandType } from 'discord.js';

export default class PingCommand extends Command {
  constructor(client: Client) {
    super(client, {
      name: 'ping',
      description: 'Shows the bot ping.',
      type: ApplicationCommandType.ChatInput,
    });
  }

  execute({ interaction }: CommandExecuteOptions) {
    interaction.reply({ content: `My ping is \`${this.client.ws.ping}\`ms` });
  }
}
