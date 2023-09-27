const fs = require('fs');
const puppeteer = require('puppeteer');

var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: './site',            // required, the root of the server file tree
  port: 5555,               // required, the port to listen
  name: 'my-http-server'   // optional, will set "X-Powered-by" HTTP header
});
 
server.start(function () {
  console.log('Server listening to', server.port);
});

const htmls = [
  'kansong.html',
  'pinzle.html',
  'skt.html'
];

async function main(languages) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();

    for (const html of htmls) {
      for (const lang of languages) {
        await page.goto(`http://localhost:5555/pages/${html}?lang=${lang}`,
          { waitUntil: 'domcontentloaded', timeout: 60000 });
        let html_content = await page.content();
        fs.writeFileSync(`${lang}/${html}`, html_content);
      }
    }
    await page.close();
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

const texts = JSON.parse((fs.readFileSync('./site/assets/texts.json')).toString());
const languages = Object.keys(texts);

for (const lang of languages) {
  try {
    fs.mkdirSync(lang);
  } catch(err) {
    ;
  }
}

setTimeout(() => {
  main(Object.keys(texts));
}, 1500);
