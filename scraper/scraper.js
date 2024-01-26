import puppeteer from 'puppeteer';

async function scrapePrintables( query ){
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  
  const page = await browser.newPage();
    
  await page.goto('https://www.printables.com/model');
    
  const acceptButton = await page.$('#onetrust-accept-btn-handler');
    
  if (acceptButton) {
    // Kliknij na przycisk, jeśli istnieje
    await acceptButton.click();
    console.log('Kliknięto na przycisk akceptacji plików cookie.');
  } else {
    console.log('Brak przycisku akceptacji plików cookie.');
  }
    
  const results = []
        
  const items = await page.$$('.print-list-item');
      
  for (let i = 0; i < items.length; i++) { 
        
    const card = await items[i].$('.card');
    const title = await card.$eval('h3', el => el.innerText);
    const url = await card.$eval('a', el => el.href);
    const img = await card.$eval('img', el => el.src);

    const header = await items[i].$('.user-card');
    const username = await header.$eval('user-name', el => el.innerText);
    
    const rating = await items[i].$('.big-icon');
    const likes = await rating.$eval('span', el => el.innerText);
    
    results.push({'source' : 'printables', title, url, img, username, likes});
  }
    
  await browser.close();

  return results;
}

async function scrapeThingiverse( query ){
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  await page.goto('https://www.thingiverse.com');


  const acceptButton = await page.$('#CybotCookiebotDialogBodyButtonDecline');

  if (acceptButton) {
  // Kliknij na przycisk, jeśli istnieje
  await acceptButton.click();
  console.log('Kliknięto na przycisk akceptacji plików cookie.');
  } else {
  console.log('Brak przycisku akceptacji plików cookie.');
  }

  const results = []
      
  const items = await page.$$('.ItemCardContainer__itemCard--GGbYM');
  console.log(items.length)
    
  for (let i = 0; i < items.length; i++) {

  const title = await items[i].$eval('.ItemCardHeader__itemCardHeader--cPULo', el => el.title);
  const url = await items[i].$eval('.ItemCardHeader__itemCardHeader--cPULo', el => el.href);
  const img = 'wip' //await items[i].$eval('.Image__image--MeY7Y.ItemCardContent__itemCardContentImage--uzD0A', el => el.src);

  //await items[i].hover();
  const username = 'wip' //await items[i].$eval('.ItemCardContent__itemCardLinkFiller--uj5HM', el => el.innerText);

  const likes = '0'//await rating.$eval('span', el => el.innerText);

  results.push({'source' : 'thingiverse', title, url, img, username, likes});
  }

  console.log(results);

  await browser.close();
}