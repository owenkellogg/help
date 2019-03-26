
import * as bcrypt from 'bcrypt';

import * as models from '../models';

export async function createAccount(email, password) {

  let passwordHash = await hash(password);

  let account = await models.Account.create({
    email: email,
    password_hash: passwordHash
  });

  return account;

}

export async function createSession(email, password) {

  let account = await models.Account.findOne({ where : {
    email
  }});

  if (!account) {
    throw new Error(`account not found for ${email}`);
  }

  bcryptCompare(password, account.password_hash);

  let session = await models.Session.create({

    account_id: account.id

  });

  return session;

}

function hash(password) {
  return new Promise((resolve, reject) => {

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) { return reject(error) }
      resolve(hash);
    })
  });
}

export async function bcryptCompare(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, res) => {
      if (res) {
        resolve();
      } else {
        reject(new Error("invalid email or password"));
      }
    })
  })
}



