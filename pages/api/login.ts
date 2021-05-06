import nc from 'next-connect';
import querystring from 'query-string';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../../serverConsts';
import { NextApiResponse, NextApiRequest } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'token',
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      redirect_uri: REDIRECT_URI
    }));
});

export default handler;