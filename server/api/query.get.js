import { scrapePrintables, scrapeThingiverse } from "../../modules/scraper/scraper.js";

export default defineEventHandler(async (event) =>{
    const query = getQuery(event)
    const printy = await scrapePrintables(query.search);
    const thingy = await scrapeThingiverse(query.search);
    const results = [].concat(printy, thingy);
    results.sort((a,b) => b.relevance - a.relevance);
    return results;
})