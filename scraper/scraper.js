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