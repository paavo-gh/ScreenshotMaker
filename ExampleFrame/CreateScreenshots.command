if [ -x "$(command -v node)" ]; then
  npm list puppeteer || npm install puppeteer
  node $0/../../app.js $0/..
else
  echo 'Node.js is needed to run this tool. To install, go to: https://nodejs.org/en/download/.' >&2
  exit 1
fi