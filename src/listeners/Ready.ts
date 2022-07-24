import { Event } from '../structures';
import type { Client } from '../Client';

export default class Ready extends Event {
  eventName: string;

  constructor() {
    super();
    this.eventName = 'ready';
  }

  async execute(client: Client) {
    client.logger.info('Bot started successfully.', { tags: ['Bot'] });

    process.on('unhandledRejection', (err: Error) => client.logger.error(err.stack as string, { tags: ['Process'] }));
    process.on('uncaughtException', (err: Error) => client.logger.error(err.stack as string, { tags: ['Process'] }));

    await client.commands.registerCommands();
  }
}
