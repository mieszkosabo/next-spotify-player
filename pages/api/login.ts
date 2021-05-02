import nc from 'next-connect';
import querystring from 'query-string';
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../../serverConsts';
import { NextApiResponse, NextApiRequest } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

handler.get((req, res) => {
  const state = generateRandomString(16);
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPES.join(' '),
      redirect_uri: REDIRECT_URI,
      state: state
    }));
});

export default handler;