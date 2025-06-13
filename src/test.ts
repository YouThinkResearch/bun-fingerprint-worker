fetch('https://fpcdn.io/v3/2tkNrumz5N?apiKey=2tkNrumz5N&ii=fingerprintjs-pro-cloudflare%2F1.6.0%2Fprocdn', {
  headers: {
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    dnt: '1',
    'upgrade-insecure-requests': '1',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-dest': 'document',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9,ru;q=0.8,en-GB;q=0.7',
    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
  },
}).then(console.log)
