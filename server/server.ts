
import * as Hapi from 'hapi';

require('dotenv').config();

import { validateToken } from './auth/token_auth';

var handlers: any = {};

handlers['sessions'] = require('./handlers/sessions');

async function createServer(): Promise<Hapi.Server> {

  // Create a server with a host and port
  const server = new Hapi.Server({
      host:'0.0.0.0',
      port: process.env.PORT || 8000
  });

  await server.register(require('hapi-auth-basic'));
  server.auth.strategy("token", "basic", { validate: validateToken });

  server.route({

      method:'DELETE',

      path:'/session',

      config: {

        auth: 'token',

        handler: handlers.sessions.destroy

      }

  });

  server.route({

      method:'GET',

      path:'/session',

      config: {

        auth: 'token',

        handler: handlers.sessions.show

      },


  });

  return server;

}

async function start() {

  let server = await createServer();

  try {

      await server.start();
  }
  catch (err) {
      console.log(err);
      process.exit(1);
  }

  console.log('Server running at:', server.info.uri);

};

export { start }

if (require.main === module) {

  start();

}

