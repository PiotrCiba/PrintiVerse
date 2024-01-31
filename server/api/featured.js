import { scrapePrintables, scrapeThingiverse } from "../../modules/scraper/scraper.js";

export default defineEventHandler(async (event) =>{
    const printy = await scrapePrintables();
    const thingy = await scrapeThingiverse();
    const results = [].concat(printy, thingy);
    results.sort((a,b) => b.relevance - a.relevance);
    return results;
})