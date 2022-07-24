import type { Client } from '../Client';
import type { Event } from '../structures';
import { readdir } from 'node:fs/promises';

export class EventManager {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async loadEvents() {
    const events = (await readdir('./listeners/')).filter(file => file.endsWith('.js'));
    for await (const event of events) {
      const { default: EventClass }: { default: new () => Event } = await import(`../listeners/${event}`);
      const evt = new EventClass();
      this.client.on(evt.eventName, (...args) => evt.execute(this.client, ...args));
    }

    this.client.logger.info(`Loaded ${events.length} events successfully!`, { tags: ['Events'] });
  }
}
