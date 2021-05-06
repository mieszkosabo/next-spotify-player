import nc from 'next-connect';
import request from 'request';
import { CLIENT_ID, CLIENT_SECRET } from '../../../serverConsts';
import { NextApiResponse, NextApiRequest } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const newRefresh = body.refresh_token;
      return res.json({
        'access_token': access_token,
        'refresh_token': newRefresh
      });
    }
    res.json({});
  });
});

export default handler;
