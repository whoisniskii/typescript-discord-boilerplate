import type { Awaitable, Client } from 'discord.js';

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
