import express from 'express';
import httpProxy from 'http-proxy';

const app = express();
const PORT = 8080;
const proxy = httpProxy.createProxyServer();

app.all('/users/*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:8081' });
});

app.all('*', (req, res) => {
    console.log(req.url)
    proxy.web(req, res, { target: 'http://localhost:5173' });
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
