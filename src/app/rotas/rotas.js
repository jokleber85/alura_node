const LivroDao = require('../infra/livro-dao.js');

const db = require('../../config/database.js');

module.exports = (app) => { //module.exports = function(app){
	app.get("/", function(req, resp){
		resp.send("<!DOCTYPE html><html lang='pt-br'><head><meta charset='utf-8'><title>Casa do Código</title></head><body><h1>CASA DO CÓDIGO</h1><h2>Sua Biblioteca Virtual</2></body></html>");
	});

	app.get("/livros", function(req, resp){ 
//TERCEIRO MÓDULO CRIADO (MESMA COISA QUE O SEGUNDO MÓDULO, POREM UTILIZANDO DAO)
//° utilizando promises
const livroDao = new LivroDao(db);
livroDao.lista()
.then(livros => resp.marko(
	require('../views/livros/lista/lista.marko'),
	{
		livros
	}
	))
.catch(erro => console.log(erro));

/*° utilizando callback
		livroDao.lista(function(erro, resultados){
			resp.marko(require('./views/livros/lista/lista.marko'),{
				livros: resultados
			})
		});*/


//SEGUNDO MÓDULO CRIADO (SUBSTITUIU O PRIMEIRO MÓDULO COM CONEXÃO COM BANCO DE DADOS )
/*		db.all("SELECT * FROM livros", function(erro, resultados){
			resp.marko(require('./views/livros/lista/lista.marko'),{
				livros: resultados
			});
		});*/


//PRIMEIRO MÓDULO CRIADO (CONEXÃO DIRETA DADOS JSON)
/*		resp.marko(require('./views/livros/lista/lista.marko'),{ 
			livros:[
				{
					id:1,
					titulo: "Fundamentos do Node"
				},
				{
					id:2,
					titulo: "Node Avançado"
				},
				{
					id:3,
					titulo: "Psicologia EAD"
				}
			]
		});*/
	});
	app.get('/livros/form', function(req, resp){
		resp.marko(require('../views/livros/form/form.marko'), {livro: {} });
	});	

	app.get('/livros/form/:id', function(req, resp){
		const id = req.params.id;
		const livroDao = new LivroDao(db);
		console.log(id);
		livroDao.buscaPorId(id)
		.then(livro => resp.marko(require('../views/livros/form/form.marko'),{livro: livro}))
		.catch(erro => console.log(erro));

	});

	app.post('/livros', function(req, resp){
		console.log(req.body);
		const livroDao = new LivroDao(db);
		livroDao.adiciona(req.body)
		.then(resp.redirect('/livros'))
		.catch(erro => console.log(erro));
	});

	app.put('/livros', function(req, resp){
		console.log(req.body);
		const livroDao = new LivroDao(db);
		livroDao.atualiza(req.body)
			.then(resp.redirect('/livros'))
			.catch(erro => console.log(erro));
	});

	app.delete('/livros/:id', function(req, resp){
		const id = req.params.id;
		const livroDao = new LivroDao(db);
		livroDao.remove(id)
		.then(() => resp.status(200).end())
		.catch(erro => console.log(erro));
	});
};