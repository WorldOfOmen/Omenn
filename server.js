const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Veriyi parça parça alarak birleştir
        });

        req.on('end', () => {
            const formData = querystring.parse(body); // Form verilerini ayrıştır

            // Form verilerini konsola yazdır
            console.log('Araba Modeli:', formData.araba_modeli);
            console.log('Araba Şikayeti:', formData.araba_sikayeti);
            console.log('Telefon Numarası:', formData.telefon_numarasi);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Form gönderildi!\n');
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found\n');
    }
});

const PORT = 3000;
const IP_ADDRESS = '0.0.0.0'; // Tüm IP adresleri üzerinden dinle

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Sunucu ${IP_ADDRESS}:${PORT} adresinde çalışıyor...`);
});
