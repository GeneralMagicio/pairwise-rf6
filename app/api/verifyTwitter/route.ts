import { NextRequest, NextResponse } from 'next/server';
const puppeteer = require('puppeteer');

interface IRequestBody {
  url: string
  text: string
}
export async function POST(req: NextRequest) {
  const body: IRequestBody = await req.json();
  let url: URL;
  try {
    url = new URL(body.url);
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Invalid URL provided.' },
      { status: 400 }
    );
  }
  if (url.host !== 'x.com' && url.host !== 'twitter.com') {
    return NextResponse.json(
      { error: 'URL provided doesn\'t belong to X(Twitter)' },
      { status: 400 }
    );
  }
  const regex = /^https?:\/\/(www\.)?(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;
  if (!regex.test(url.toString())) {
    console.error(url.toString(), regex.test(url.toString()));
    return NextResponse.json(
      { error: 'URL isn\'t a valid post' },
      { status: 400 }
    );
  }
  const paramsArray = url.pathname.split('/');
  if (paramsArray.length !== 4) {
    /* most probably wont happen because of regex */
    return NextResponse.json(
      { error: 'URL isn\'t a valid post' },
      { status: 400 }
    );
  }

  const userhandle = paramsArray[1];
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  await page.goto(url.toString(), { waitUntil: 'networkidle2' });
  const title = await page.title();
  const compTitle = body.text.replace(/\n/g, ' ').replace('https://app.pairvise.vote', '').replace('  ', ' ').trim();
  if (!title.includes(compTitle)) {
    return NextResponse.json(
      {
        error: 'Verification Failed as tweet doesn\'t contain the text',
        compTitle,
        title,
      },
      {
        status: 400,
      }
    );
  }
  const username = title.replace(/ on X: ".*?" \/ X/, '');
  await browser.close();

  return NextResponse.json(
    {
      data: {
        username: userhandle,
        displayName: username,
      },
    },
    { status: 200 }
  );
}