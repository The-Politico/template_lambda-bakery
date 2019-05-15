import expect from 'expect.js';
import portfinder from 'portfinder';
import fetch from 'node-fetch';
import expressServer from 'Bakery/server/';
import { sweepTmp } from 'Bakery/utils/';

let port;
let server;
const TOKEN = 'Token TESTING';

describe('tests baking', async function() {
  before(async function() {
    process.env.API_VERIFICATION_TOKEN = TOKEN;
    portfinder.basePort = 3333;
    port = await portfinder.getPortPromise().then(p => p);
    server = await expressServer.listen(port, () => console.log(`Bakery server listening on port ${port}!`));
    sweepTmp();
  });

  it('tests the API is OK', async function() {
    const response = await fetch(`http://localhost:${port}`, {
      headers: {
        Authorization: `Token ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        action: 'check_api',
        data: [],
      }),
    })
      .then(response => response);
    expect(response.status).to.be(200);
  });

  after(function() {
    server.close();
  });
});
