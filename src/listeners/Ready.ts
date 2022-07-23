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

    client.on('error', (err): any => client.logger.error(err as unknown as any, { tags: ['Bot'] }));
    process.on('unhandledRejection', err => client.logger.error(err as any, { tags: ['Process'] }));
    process.on('uncaughtException', err => client.logger.error(err as any, { tags: ['Process'] }));

    await client.commands.registerCommands();
  }
}
