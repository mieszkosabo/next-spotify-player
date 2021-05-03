import nc from 'next-connect';
import { NextApiResponse, NextApiRequest } from "next";
import puppeteer from 'puppeteer';

const handler = nc<NextApiRequest, NextApiResponse>();

const cache = {};
const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/';

handler.get(async (req, res) => {
  const { artistId }  = req.query;
  console.log({cache});
  if (cache[artistId as string]) {
    console.log('cached!');
    return res.json(cache[artistId as string]);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto(`${SPOTIFY_ARTIST_URL}${artistId}`);
  await page.waitForSelector('[data-testid=background-image]', { timeout: 5000});
  await page.screenshot({ path: 'example.png' });
  const bgUrl = await page.evaluate(() => {
    const res = document.querySelector('[data-testid=background-image]').style.backgroundImage;
    return res;
  });
  await browser.close();
  const retrievedUrl = bgUrl ? JSON.stringify(bgUrl.match(/"([^"]+)"/)[1]) : null;
  cache[artistId as string] = retrievedUrl;
  console.log(cache);
  res.json(retrievedUrl);
});

export default handler;