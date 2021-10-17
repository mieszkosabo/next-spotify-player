import nc from 'next-connect';
import { NextApiResponse, NextApiRequest } from "next";
import request from 'request';

const handler = nc<NextApiRequest, NextApiResponse>();

const createImageApiUrl = (artistId: string) => (
 `https://api-partner.spotify.com/pathfinder/v1/query?operationName=queryArtistOverview&variables=%7B%22uri%22%3A%22spotify%3Aartist%3A${artistId}%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d66221ea13998b2f81883c5187d174c8646e4041d67f5b1e103bc262d447e3a0%22%7D%7D`
);

handler.get(async (req, res) => {
  const { artistId }  = req.query;
  request.get({ 
    uri: process.env.NODE_ENV !== "development" ? `${process.env.BASE_URL}/api/bgImageToken` : 'http://localhost:4000/api/bgImageToken', 
    json: true 
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const token = body.token;
      const options = {
        url: createImageApiUrl(artistId as string),
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };
      request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const bgUrl = body.data?.artist?.visuals?.headerImage?.sources[0]?.url;
          return res.json({bgUrl});
        } else {
          res.json(null);
        }
      });
    }
    else {
      res.json(null);
    }
  });
});

export default handler;