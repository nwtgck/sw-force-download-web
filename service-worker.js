self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === '/swdonwload') {
    const targetUrl = url.searchParams.get('url');
    const filename = url.searchParams.get('filename');
    
    event.respondWith((async () => {
      const res = await fetch(targetUrl);
      const headers = new Headers([...res.headers.entries()]);
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
      const downloadableRes = new Response(res.body, {
        headers
      });
      return downloadableRes;
    })());
  }
});
