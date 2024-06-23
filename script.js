// script.js

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString(); // Veriyi parça parça alarak birleştir
        });

        req.on('end', () => {
            const formData = querystring.parse(body); // Form verilerini ayrıştır

            // Terminalde form verilerini göster
            console.log('Araba Modeli:', formData.araba_modeli);
            console.log('Araba Şikayeti:', formData.araba_sikayeti);
            console.log('Telefon Numarası:', formData.telefon_numarasi);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Form gonderıldı!\n');
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
});

server.listen(3000, () => {
    console.log('Sunucu çalışıyor...');
});
