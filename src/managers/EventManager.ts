import type { Client } from '../Client';
import { readdirSync } from 'fs';
import type { Event } from '../structures';

class EventManager {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async loadEvents() {
    const eventFiles = readdirSync('./listeners');

    for await (const file of eventFiles) {
      if (!file.endsWith('.js')) continue;

      const { default: EventClass }: { default: new () => Event } = await import(`../listeners/${file}`);
      const event = new EventClass();
      this.client.on(event.eventName, (...args: any[]) => event.execute(this.client, ...args));
    }

    this.client.logger.info(`Loaded ${eventFiles.length} events successfully!`, { tags: ['Events'] });
  }
}

export { EventManager };
