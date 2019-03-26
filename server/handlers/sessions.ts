
export async function show(request,h) {

  return {
  
    account: request.account,

    session: request.session

  }

}

export async function destroy(request,h) {

  await request.session.update({

    invalidated: true

  });

  return {

    session: request.session

  }

}

