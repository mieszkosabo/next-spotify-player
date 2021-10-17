import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { promisify } from 'util';
import redis from 'redis';
import puppeteer from 'puppeteer';



const handler = nc<NextApiRequest, NextApiResponse>();
const REFRESH_TOKEN_RATE_IN_MINUTES = 10;

handler.get(async (req, res) => {
    // redis setup
    const client = redis.createClient(
        Number(process.env.REDIS_PORT),
        process.env.REDIS_HOST
    );
    client.auth(process.env.REDIS_PASSWORD);
    const asyncSet = promisify(client.set).bind(client);
    const asyncGet = promisify(client.get).bind(client);

    const token = await asyncGet('token');
    const lastRefresh = await asyncGet('refresh_ts');
    const currTimestamp = new Date().getTime();
    if (lastRefresh != null && ((currTimestamp - lastRefresh) / 1000 / 60) < REFRESH_TOKEN_RATE_IN_MINUTES) { // token is legit
        res.json({ token });
        client.quit();
        return;
    }

    // token needs to be refreshed

    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    const getToken = new Promise((resolve) => {
        page.on('request', req => {
            const auth = req.headers().authorization;
            if (auth != null) {
                return resolve(auth.split(' ')[1]);
            }
        });
    });
    // any artist is fine for requiring the token
    await page.goto('https://open.spotify.com/artist/00FQb4jTyendYWaN8pK0wa');
    const newToken = await getToken;
    res.json({ token: newToken });
    await browser.close();
    await asyncSet("token", newToken);
    await asyncSet("refresh_ts", currTimestamp);
    client.quit();
});

export default handler;
