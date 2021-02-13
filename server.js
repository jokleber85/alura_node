//custom-express.js
const app = require('./src/config/custom-express');


app.listen(3000, function(){
	console.log("Conexão realizada com sucesso...")
});

/*const http = require('http');

const servidor = http.createServer(function (req, resp){
	let html = '';

	if(req.url == '/'){
		html = '<!DOCTYPE html><html lang="pt-br"><head><meta charset="utf-8"><title>Casa do Código</title></head><body><h1>Casa do Código</h1></body></html>';
	}
	else if(req.url == '/livros'){
		html = '<!DOCTYPE html> <html lang="pt-br"><head><meta charset="utf-8"></head><body><h1>LIVROS</h1></body></html>';
	}

	resp.end(html);
});

servidor.listen(3000); */