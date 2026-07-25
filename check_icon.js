const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

async function run() {
  const iconRes = await checkUrl('https://quicktool.space/icon');
  console.log('1. /icon ->', iconRes);
  const favRes = await checkUrl('https://quicktool.space/favicon.ico');
  console.log('2. /favicon.ico ->', favRes);
  
  https.get('https://quicktool.space/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<link[^>]*rel="(?:shortcut )?icon"[^>]*>/gi);
      console.log('3. Source <link rel="icon"> ->', match ? match.join('\n') : 'Not found');
    });
  });
}
run();
