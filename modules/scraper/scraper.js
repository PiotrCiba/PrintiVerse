import puppeteer from 'puppeteer-core';
import edgeChromium from 'chrome-aws-lambda';
import {ratio} from 'fuzzball';

const LOCAL_CHROME_EXECUTABLE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

export async function scrapePrintables( query ){

  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: edgeChromium.headless,
  })
  
  const page = await browser.newPage();

  let url = 'https://www.printables.com/model';

  if(query){
    url = `https://www.printables.com/search/models?q=${query}&ctx=models`
  }

  await page.goto(url);
  page.waitForNavigation();

  const cookieOptions = await page.$('#onetrust-pc-btn-handler');
    
  if (cookieOptions) {
    // Kliknij na przycisk, jeśli istnieje
    await cookieOptions.click();
    const declineButton = await page.$(".ot-pc-refuse-all-handler");
    if(declineButton){
      await declineButton.click();
      console.log('Kliknięto na przycisk odrzucenia plików cookie.');
    }
  } else {
    console.log('Brak zapytania o pliki cookie.');
  }
    
  const results = []
        
  const items = await page.$$('.print-list-item');
      
  for (let id = 0; id < items.length; id++) { 
        
    const card = await items[id].$('.card');
    const title = await card.$eval('h3', el => el.innerText);
    const url = await card.$eval('a', el => el.href);
    const img = await card.$eval('img', el => el.src);

    const header = await items[id].$('.user-card');
    const username = await header.$eval('user-name', el => el.innerText);
    
    const rating = await items[id].$('.big-icon');
    const likes = await rating.$eval('span', el => el.innerText);

    let relevance = items.length-id

    if(query){
      relevance *= ratio(query, title)
    }
    
    results.push({id, 'source' : 'printables', title, url, img, username, likes, relevance});
  }
    
  await browser.close();

  return results;
}

export async function scrapeThingiverse( query ){
  
  const executablePath = await edgeChromium.executablePath || LOCAL_CHROME_EXECUTABLE

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  })

  const page = await browser.newPage();

  let url = 'https://www.thingiverse.com';

  if(query){
    url = `https://www.thingiverse.com/search?q=${query}&page=1`
  }

  await page.goto(url);
  await waitForNetworkIdle(page, 1000);

  const acceptButton = await page.$('#CybotCookiebotDialogBodyButtonDecline');

  if (acceptButton) {
  // Kliknij na przycisk, jeśli istnieje
  await acceptButton.click();
  console.log('Kliknięto na przycisk odrzucenia plików cookie.');
  } else {
    console.log('Brak zapytania o pliki cookie.');
  }

  const results = []
      
  const items = await page.$$('.ItemCardContainer__itemCard--GGbYM');
  
  for (let id = 0; id < items.length; id++) {

    const title = await items[id].$eval('.ItemCardHeader__itemCardHeader--cPULo', el => el.title);
    if(title == "Advertisement"){
        continue;
    }
    const url = await items[id].$eval('.ItemCardHeader__itemCardHeader--cPULo', el => el.href);
    const img = await items[id].$$eval('.Image__image--MeY7Y.ItemCardContent__itemCardContentImage--uzD0A', el => el.src);

    await items[id].hover();

    const username = await items[id].$eval('a[class^="ItemCardContent__itemCardUserLink--gMgsV itemCardHiddenItem"]', el => el.innerText);

    const likes = await items[id].$eval('div[class^="ButtonCounterWrapper__buttonCounter--YXhXL"]', el => el.innerText);

    let relevance = items.length-id

    if(query){
      relevance *= ratio(query, title);
    }

    results.push({id, 'source' : 'thingiverse', title, url, img, username, likes, relevance});
  }
  

  await waitForNetworkIdle(page, 1000);
  await browser.close()
  return results
}

async function waitForNetworkIdle(page, timeout = 500, maxInflightRequests = 0) {
  page.on('request', onRequestStarted);
  page.on('requestfinished', onRequestFinished);
  page.on('requestfailed', onRequestFinished);
 
  let inflight = 0;
  let fulfill;
  let promise = new Promise(x => fulfill = x);
  let timeoutId = setTimeout(onTimeoutDone, timeout);
  function onRequestStarted() { ++inflight; }
  function onRequestFinished() {
     if (inflight === 0) return;
     --inflight;
     if (inflight === maxInflightRequests) fulfill();
  }
  function onTimeoutDone() {
     page.removeListener('request', onRequestStarted);
     page.removeListener('requestfinished', onRequestFinished);
     page.removeListener('requestfailed', onRequestFinished);
     fulfill();
  }
  await promise;
  clearTimeout(timeoutId);
 }