const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

module.exports.scrapeProduct = async (url)=>{

    try {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage()
     page.setDefaultNavigationTimeout(0); 
    await page.goto(url)
    
    const services = await page.evaluate(() =>
  Array.from(
    document.querySelectorAll('ul.contests-active  li.contests-list-view   h4.contest-item-title'),
    (element) => element.textContent
  )
)

const services1 = await page.evaluate(() =>
  Array.from(
    document.querySelectorAll('ul.contests-active  li.contests-list-view   time.timeago'),
    (element) => element.textContent
  )
)

const obj = {
    services,
    services1
}
    
    browser.close();
    console.log('hackerank ka hai',obj)
    return obj

    
    
} catch (error) {
        console.log('error',error.message)
    }  
}



