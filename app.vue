
import Navbar from './components/navbar.vue';
<template>
  <Navbar/>
  <div>
    
  </div>
</template>

<script setup>
  import puppeteer from 'puppeteer';
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

    await items[i].hover();
    const username = 'wip' //await items[i].$eval('.ItemCardContent__itemCardLinkFiller--uj5HM', el => el.innerText);
    

    const rating = ''//await items[i].$('.big-icon');
    const likes = ''//await rating.$eval('span', el => el.innerText);
    
    results.push({'source' : 'thingiverse', title, url, img, username, likes});
  }

  console.log(results);
    
  await browser.close();
</script>