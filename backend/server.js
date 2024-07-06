//запуск MongoDB: mongod --dbpath /Users/savostiny/Downloads/mongodb-data

const fastify = require('fastify')({ logger: true });
const config = require('./config');
const fastifyCors = require('@fastify/cors');
const { ObjectId } = require('mongodb');
const fastifyWebsocket = require('@fastify/websocket');
const nodemailer = require('nodemailer');

// Регистрация плагина MongoDB
fastify.register(require('@fastify/mongodb'), {
	forceClose: true,
	forceClose: true,
	url: config.mongoURI
});
fastify.register(fastifyCors, {
	origin: 'http://localhost:3000'
});
// Регистрация плагина WebSocket
fastify.register(fastifyWebsocket, {
	options: {
		maxPayload: 1048576,
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


// Главный роут
fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

// Создаем транспортер для отправки писем
const transporter = nodemailer.createTransport({
	host: 'live.smtp.mailtrap.io',
	port: 587,
	secure: false,
	auth: {
		user: 'api',
		pass: 'f32cebe90962ecda977b6e67ec09da47',
	},
});

// Функция для отправки письма
const sendEmail = async (to, subject, text) => {

	try {
		await transporter.sendMail({
			from: 'mailtrap@demomailtrap.com',
			to,
			subject,
			text,
		});
		console.log('Email sent successfully');
	} catch (error) {
		console.error('Error sending email:', error);
	}
};

fastify.post('/send-message', async (request, reply) => {
	const { email, subject, message } = request.body;

	try {
		await sendEmail(email, subject, message);
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
	const { page = 1, limit = 5 } = request.query;

	const currentPage = parseInt(page, 10);
	const pageSize = parseInt(limit, 10);

	const skip = (currentPage - 1) * pageSize;

	try {
		const articles = await fastify.mongo.db
			.collection('articles')
			.find({})
			.skip(skip)
			.limit(pageSize)
			.toArray();

		return articles;
	} catch (error) {
		fastify.log.error('Error fetching articles:', error);
		reply.status(500).send({ error: 'Failed to fetch articles' });
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

// Роут для добавления новой статьи
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
		image
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
