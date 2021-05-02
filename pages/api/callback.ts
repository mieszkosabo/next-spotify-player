import nc from 'next-connect';
import querystring from 'query-string';
import request from 'request';
import { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET } from '../../serverConsts';
import { NextApiResponse, NextApiRequest } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
    if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token } = body;
        res.redirect(`/?${querystring.stringify({ accessToken: access_token, refreshToken: refresh_token})}`);
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

export default handler;