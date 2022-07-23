import {
  Client as DiscordClient, GatewayIntentBits, Partials, ActivityType,
} from 'discord.js';
import { CommandManager, EventManager } from './managers';
import { Logger, createLogger } from './utils/Logger';

export class Client extends DiscordClient {
  commands: CommandManager;
  events: EventManager;
  logger: Logger;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message],
      failIfNotExists: false,
      allowedMentions: {
        parse: ['users'],
        repliedUser: false,
      },
      presence: {
        status: process.env.NODE_ENV === 'development' ? 'idle' : 'online',
        activities: [{
          name: '/help', type: ActivityType.Playing,
        }],
      },
    });

    this.commands = new CommandManager(this);
    this.events = new EventManager(this);
  }

  async start() {
    this.logger = createLogger(
      {
        handleExceptions: true,
        handleRejections: true,
      },
      this,
    );
    await this.commands.loadCommands(this);
    await this.events.loadEvents();

    await super.login(process.env.BOT_TOKEN);
  }
}
