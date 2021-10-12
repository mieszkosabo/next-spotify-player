import nc from 'next-connect';
import { NextApiResponse, NextApiRequest } from "next";
import genericPool from 'generic-pool';
import puppeteer, { Browser } from 'puppeteer';

const cache = {};

const factory = {
  create: () => puppeteer.launch(),
  destroy: (browser: Browser) => browser.close()
};

const puppeteerPool = genericPool.createPool(factory, { max: 7, min: 2});

const handler = nc<NextApiRequest, NextApiResponse>();

const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/';

handler.get(async (req, res) => {
  const { artistId }  = req.query;
  const redisResult = cache[artistId as string];
  if (redisResult != null) {
    return res.json(redisResult);
  }
  try {
    const browser = await puppeteerPool.acquire();
    const page = await browser.newPage();
    try {
      await page.setViewport({
        width: 1920,
        height: 1080
      });
      await page.goto(`${SPOTIFY_ARTIST_URL}${artistId}`);
      await page.waitForSelector('[data-testid=background-image]', { timeout: 10_000 });
      const bgUrl = await page.evaluate(() => {
        const res = (document.querySelector('[data-testid=background-image]') as any)?.style?.backgroundImage;
        return res;
      });
      const retrievedUrl = bgUrl ? JSON.stringify(bgUrl.match(/"([^"]+)"/)[1]) : null;
      cache[artistId as string] = retrievedUrl;
      res.json(retrievedUrl);
    } catch (error) {
      res.json(null);
    } finally {
      await page.close();
      await puppeteerPool.release(browser);
    }
  } catch (_) {
    res.json(null);
  }
});

export default handler;