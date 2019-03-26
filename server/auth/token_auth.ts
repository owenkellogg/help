
import * as models from '../../models';

import * as moment from 'moment';

export async function validateToken(request, username, password, h) {

  console.log('validate token', username);

  if (!username) {

    return h.response({
      isValid: false
    })
    .code(401)
  }

  var session = await models.Session.findOne({
    where: {
      token: username
    }
  });

  if (session.invalidated) {

    return h.response({
      isValid: false
    })
    .code(401);

  }

  if (session) {
		var account = await models.Account.findOne({
			where: {
				id: session.account_id
			}
		})
		request.account = account;
    request.session = session;

    return {
      isValid: true,
      credentials: { session: session }
    }
  } else {

    console.log('no session found');

    return h.response({
      isValid: false
    })
    .code(401)
  }
};
