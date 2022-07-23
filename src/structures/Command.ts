import type { Client } from '../Client';
import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

export type CommandExecuteOptions = { interaction: ChatInputCommandInteraction };

class Command {
  client: Client;
  options: ChatInputApplicationCommandData;

  constructor(client: Client, options: ChatInputApplicationCommandData) {
    this.client = client;
    this.options = options;
  }

  execute({ interaction }: CommandExecuteOptions): Awaitable<any> {
    return { interaction };
  }
}

export { Command };
