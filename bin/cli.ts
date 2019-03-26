#!/usr/bin/env ts-node

var program = require('commander');
require('dotenv').config();

import {
  createAccount,
  createSession
} from '../lib';

program
  .command('createaccount <email> <password>')
  .action(async (email, password) => {

    let account = await createAccount(email, password);

    console.log(account.toJSON());

    process.exit(0);

  })

program
  .command('createsession <email> <password>')
  .action(async (email, password) => {

    let session = await createSession(email, password);

    console.log(session.toJSON());

    process.exit(0);

  })

program.parse(process.argv);
