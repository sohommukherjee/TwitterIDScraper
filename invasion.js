const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    const url = 'https://twiteridfinder.com/';

    // Navigate to the website
    await page.goto(url);

    // Wait for the required elements to be available
    await page.waitForSelector('#tweetbox2');
    await page.waitForSelector('#button_convert');

    // Target the input element with ID "tweetbox2"
    await page.type('#tweetbox2', '@itstimbunyan');

    // Target the button with ID "button_convert" and simulate a click event
    await page.click('#button_convert');

    // Wait for the results to load (we'll wait for the value of #js-results-id to change)
    await page.waitForFunction(() => {
      const finalIDElement = document.getElementById('js-results-id');
      return finalIDElement.textContent !== '-';
    });

    // Get the final ID
    const finalIDElement = await page.$('#js-results-id');
    const finalID = await page.evaluate(element => element.textContent, finalIDElement);

    console.log('Final ID:', finalID);

    // Save the final ID to a text file
    fs.writeFileSync('idList.txt', finalID);

    await browser.close();
    console.log('Data saved to idList.txt');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
