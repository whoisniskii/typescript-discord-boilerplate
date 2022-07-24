import type { Client } from '../Client';
import { readdir } from 'node:fs/promises';
import type { Command } from '../structures';
import { ChatInputApplicationCommandData, Collection } from 'discord.js';

export class CommandManager {
  client: Client;
  manager: Collection<string, Command>;

  constructor(client: Client) {
    this.client = client;
    this.manager = new Collection();
  }

  async loadCommands(client: Client) {
    const categories = await readdir('./commands/');
    for await (const category of categories) {
      const commands = await readdir(`./commands/${category}`);

      for await (const command of commands) {
        if (!command.endsWith('.js')) continue;

        const commandWithoutExtension = command.replace('.js', '');
        const { default: CommandClass }: { default: new (_client: Client) => Command } = await import(`../commands/${category}/${command}`);
        const cmd = new CommandClass(client);
        this.manager.set(commandWithoutExtension, cmd);
      }

      this.client.logger.info(`Loaded ${commands.length} commands successfully!`, { tags: ['Command'] });
    }
  }

  getCommand(commandName: string) {
    return this.manager.get(commandName);
  }

  async registerCommands() {
    const mappedCommands = this.client.commands.manager.map(x => x.options) as ChatInputApplicationCommandData[];

    await this.client.application?.commands.set(mappedCommands);
    this.client.logger.info(`Posted ${mappedCommands.length} commands to Discord!`, {
      tags: ['Commands'],
    });
  }
}
