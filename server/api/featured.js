import { scrapePrintables, scrapeThingiverse } from "../../modules/scraper/scraper.js";

export default defineEventHandler(async (event) =>{
    const promiseprinty = scrapePrintables();
    const promisethingy = scrapeThingiverse();
    const printy = await promiseprinty;
    const thingy = await promisethingy;
    const results = [].concat(printy, thingy);
    results.sort((a,b) => b.relevance - a.relevance);
    return results;
})