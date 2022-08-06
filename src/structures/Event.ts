import type { Awaitable } from 'discord.js';
import type { Client } from '../Client';

export abstract class Event <EventClient = Client> {
  eventName: string;

  execute(client: EventClient, ...args: unknown[]): Awaitable<void> {
    return { client, args };
  }
}
