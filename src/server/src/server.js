//запуск MongoDB: mongod --dbpath /Users/savostiny/Downloads/mongodb-data

const fastify = require('fastify')({ logger: true });
const config = require('./config');
const fastifyCors = require('@fastify/cors');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
const fastifySocketIo = require('fastify-socket.io');
// Регистрация плагина MongoDB
fastify.register(require('@fastify/mongodb'), {
	forceClose: true,
	url: config.mongoURI
});
fastify.register(fastifyCors, {
	origin: 'http://localhost:3000'
});
// Регистрация плагина WebSocket
fastify.register(fastifySocketIo, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

// Маршрут WebSocket
fastify.register((fastify, opts, done) => {
	fastify.get('/chat', { websocket: true }, (connection, req) => {
		connection.socket.on('message', message => {
			// Обрабатываем входящие сообщения
			fastify.log.info(`Received message: ${message}`);

			// Рассылаем сообщение всем подключенным клиентам
			fastify.websocketServer.clients.forEach(client => {
				if (client.readyState === 1) { // Проверяем, что клиент готов к отправке сообщений
					client.send(message);
				}
			});
		});
	});
	done();
});



// Маршрут WebSocket
// fastify.register((fastify, opts, done) => {
// 	fastify.get('/chat', { websocket: true }, (connection, req) => {
// 		connection.socket.on('message', message => {
// 			// Обрабатываем входящие сообщения
// 			fastify.log.info(`Received message: ${message}`);

// 			// Рассылаем сообщение всем подключенным клиентам
// 			fastify.websocketServer.clients.forEach(client => {
// 				if (client.readyState === 1) { // Проверяем, что клиент готов к отправке сообщений
// 					client.send(message);
// 				}
// 			});
// 		});
// 	});
// 	done();
// });


// Главный роут
fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

async function sendMail({ email, subject, messageBody }) {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: 'top642lg@gmail.com',
		to: email,
		subject: subject,
		text: messageBody,
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log('Message sent: %s', info.messageId);
	} catch (err) {
		console.log('Error sending email: ', err);
	}
}




fastify.post('/send-message', async (request, reply) => {
	const { email, subject, message } = request.body;

	try {
		await sendMail(email, subject, message);
		return reply.send({ message: 'Email sent successfully' });
	} catch (error) {
		console.error('Error sending email:', error);
		return reply.status(500).send({ error: 'Failed to send email' });
	}
});

// Роут для получения количества статей
fastify.get('/articles/count', async (request, reply) => {
	try {
		const count = await fastify.mongo.db.collection('articles').countDocuments();
		return reply.send({ count });
	} catch (err) {
		fastify.log.error(err);
		return reply.status(500).send({ error: 'Failed to get articles count' });
	}
});

// Роут для получения списка статей
fastify.get('/articles', async (request, reply) => {
	const { page = 1, limit = 5 } = request.query; // Получаем параметры пагинации из запроса

	const currentPage = parseInt(page, 10); // Преобразуем параметры в целые числа
	const pageSize = parseInt(limit, 10);

	const skip = (currentPage - 1) * pageSize; // Рассчитываем количество пропущенных документов

	try {
		const articles = await fastify.mongo.db.collection('articles')
			.find()
			.sort({ createdAt: -1 }) // Сортировка по полю createdAt в обратном порядке
			.skip(skip)
			.limit(pageSize)
			.toArray();

		const totalArticles = await fastify.mongo.db.collection('articles').countDocuments(); // Общее количество статей
		const totalPages = Math.ceil(totalArticles / pageSize); // Общее количество страниц

		return reply.send({
			articles,
			currentPage,
			totalPages,
			totalArticles
		});
	} catch (err) {
		fastify.log.error('Failed to fetch articles:', err);
		return reply.status(500).send({ error: 'Failed to fetch articles' });
	}
});


// Роут для получения отдельной статьи по id
fastify.get('/articles/:id', async (request, reply) => {
	const id = request.params.id;
	console.log(typeof id)
	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });
		if (!article) {
			reply.code(404).send({ error: 'Article not found' });
		} else {
			return article;
		}
	} catch (error) {
		reply.code(500).send({ error: 'Internal Server Error' });
	}
});
fastify.post('/articles/:id/comments', async (request, reply) => {
	const id = request.params.id;
	const { author, content, date, avatar } = request.body;

	if (!author || !content || !date || !avatar || !author.trim() || !content.trim()) {
		return reply.status(400).send({ error: 'Author, content, date, and avatar cannot be empty or just spaces.' });
	}

	const comment = { author, content, date, avatar };

	try {
		const result = await fastify.mongo.db.collection('articles').updateOne(
			{ _id: new ObjectId(id) },
			{ $push: { comments: comment } }
		);

		if (result.modifiedCount === 0) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		return reply.status(201).send(comment);
	} catch (err) {
		fastify.log.error('Failed to add comment:', err);
		return reply.status(500).send({ error: 'Failed to add comment' });
	}
});


// Роут для получения информации о статье, включая комментарии, лайки и дизлайки
fastify.get('/articles/:id/comments', async (request, reply) => {
	const id = request.params.id;

	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });

		if (!article) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		return reply.send({
			comments: article.comments || [],
			likes: article.likes || 0,
			dislikes: article.dislikes || 0
		});
	} catch (err) {
		fastify.log.error('Failed to fetch comments and likes/dislikes:', err);
		return reply.status(500).send({ error: 'Failed to fetch comments and likes/dislikes' });
	}
});

fastify.post('/articles', async (request, reply) => {
	const { title, date, author, content, image } = request.body;

	if (!title || !date || !author || !content) {
		console.log('Missing required fields');
		return reply.status(400).send({ error: 'Missing required fields' });
	}

	const article = {
		title,
		date,
		author,
		content,
		image,
		comments: [],
		likes: 0,
		dislikes: 0,
		createdAt: new Date() // добавляем поле createdAt
	};

	try {
		const result = await fastify.mongo.db.collection('articles').insertOne(article);
		console.log('Article added successfully', result);
		const insertedArticle = await fastify.mongo.db.collection('articles').findOne({ _id: result.insertedId });
		return reply.status(201).send(insertedArticle);
	} catch (err) {
		fastify.log.error('Failed to add article:', err);
		console.log('Error details:', err);
		return reply.status(500).send({ error: 'Failed to add article' });
	}
});


fastify.post('/articles/:id/like', async (request, reply) => {
	const id = request.params.id;

	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });

		if (!article) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		await fastify.mongo.db.collection('articles').updateOne(
			{ _id: new ObjectId(id) },
			{ $inc: { likes: 1 } }
		);

		return reply.send({ success: true });
	} catch (err) {
		fastify.log.error('Failed to update likes:', err);
		return reply.status(500).send({ error: 'Failed to update likes' });
	}
});

fastify.post('/articles/:id/unlike', async (request, reply) => {
	const id = request.params.id;

	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });

		if (!article) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		await fastify.mongo.db.collection('articles').updateOne(
			{ _id: new ObjectId(id) },
			{ $inc: { likes: -1 } }
		);

		return reply.send({ success: true });
	} catch (err) {
		fastify.log.error('Failed to update likes:', err);
		return reply.status(500).send({ error: 'Failed to update likes' });
	}
});

fastify.post('/articles/:id/dislike', async (request, reply) => {
	const id = request.params.id;

	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });

		if (!article) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		await fastify.mongo.db.collection('articles').updateOne(
			{ _id: new ObjectId(id) },
			{ $inc: { dislikes: 1 } }
		);

		return reply.send({ success: true });
	} catch (err) {
		fastify.log.error('Failed to update dislikes:', err);
		return reply.status(500).send({ error: 'Failed to update dislikes' });
	}
});

fastify.post('/articles/:id/undislike', async (request, reply) => {
	const id = request.params.id;

	try {
		const article = await fastify.mongo.db.collection('articles').findOne({ _id: new ObjectId(id) });

		if (!article) {
			return reply.status(404).send({ error: 'Article not found' });
		}

		await fastify.mongo.db.collection('articles').updateOne(
			{ _id: new ObjectId(id) },
			{ $inc: { dislikes: -1 } }
		);

		return reply.send({ success: true });
	} catch (err) {
		fastify.log.error('Failed to update dislikes:', err);
		return reply.status(500).send({ error: 'Failed to update dislikes' });
	}
});



const start = async () => {
	try {
		await fastify.listen(config.server);
		fastify.log.info(`Server listening on ${config.server.address}:${config.server.port}`);
	} catch (err) {
		console.log('Error details:', err);
		fastify.log.error('Error starting server:', err);
		process.exit(1);
	}
};

start();
