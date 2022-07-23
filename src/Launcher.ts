import { Client } from './Client';
import { config } from 'dotenv';

config({ path: '../.env' });

new Client().start();
