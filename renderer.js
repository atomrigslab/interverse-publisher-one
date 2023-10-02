const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const watch = require('watch');

const { createServer } = require('http-server');
let webServer = null;

const currentPath = process.cwd();
console.log('Current path:', currentPath);

function render(targetFilePath) {
  try {
    const allTexts = JSON.parse(
      (
        fs.readFileSync(path.join(currentPath, 'assets/texts.json')).toString()
      )
    );

    const fileContent = fs.readFileSync(targetFilePath);

    for (const [lang, texts] of Object.entries(allTexts)) {
      console.log(`Rendering ${lang} for ${targetFilePath}...`);
      const filename = path.basename(targetFilePath);
      const htmlContent = ejs.render(fileContent.toString(), texts);
      fs.writeFileSync(path.join(currentPath, `${lang}/${filename}`), htmlContent);
    }
  } catch(err) {
    console.error(err);
  }
}

function startWebServer() {
  const port = 5555;
  webServer = createServer({
    root: currentPath
  });

  webServer.listen(port, '0.0.0.0');
}

function createTargetDirectories() {
  const texts = JSON.parse(
    (
      fs.readFileSync(path.join(currentPath, 'assets/texts.json'))
    ).toString()
  );
  const languages = Object.keys(texts);

  for (const lang of languages) {
    try {
      console.log(`Creating ${lang} directory...`);
      fs.mkdirSync(lang);
    } catch(err) {
      ;
    }
  }
}

function startWatch() {
  watch.createMonitor(path.join(currentPath, 'src'), {
    interval: 0.1, // 0.1 = 100ms
    // filter: (filepath) =>(filepath.indexOf('.html') >= 0)
  }, (monitor) => {
    monitor.on("changed", function (f, curr, prev) {
      // f: 파일 전체 경로, 문자열
      console.log(`${f} is changed. Re-rendering...`)
      render(f);
    })
  });
}

function start() {
  createTargetDirectories();

  const srcPath = path.join(currentPath, 'src');
  const dirContent = fs.readdirSync(srcPath);
  for(const file of dirContent) {
    render(path.join(srcPath, file));
  }

  startWatch();
  startWebServer();
}

start();