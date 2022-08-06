import type { Client } from '../Client';
import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

export type CommandExecuteOptions = { interaction: ChatInputCommandInteraction };

export abstract class Command <CommandClient = Client> {
  client: CommandClient;
  options: ChatInputApplicationCommandData;

  constructor(client: CommandClient, options: ChatInputApplicationCommandData) {
    this.client = client;
    this.options = options;
  }

  execute({ interaction }: CommandExecuteOptions): Awaitable<void> {
    return { interaction };
  }
}
