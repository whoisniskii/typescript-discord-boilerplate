import type { Interaction } from 'discord.js';
import { CommandExecuteOptions, Event } from '../structures';
import type { Client } from '../Client';

export default class InteractionCreate extends Event {
  eventName: string;

  constructor() {
    super();
    this.eventName = 'interactionCreate';
  }

  execute(client: Client, interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.getCommand(interaction.commandName);

    command?.execute({ interaction } as CommandExecuteOptions);
  }
}
