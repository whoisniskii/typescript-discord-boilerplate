import type { Awaitable } from 'discord.js';
import type { Client } from '../Client';

class Event {
  eventName: string;

  constructor() {
    this.eventName = '';
  }

  execute(client: Client, ...args: unknown[]): Awaitable<any> {
    return { client, args };
  }
}

export { Event };
