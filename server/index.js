const fastify = require('fastify')({ logger: true });

let todos = [];

fastify.get('/todos', async (request, reply) => {
  return todos;
});


fastify.post('/todos', async (request, reply) => {
  const { id, title, completed } = request.body;
  todos.push({ id, title, completed });
  reply.code(201).send({ id, title, completed });
});

fastify.put('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { title, completed } = request.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return reply.code(404).send({ error: 'Todo not found' });
  }

  todos[todoIndex] = { id, title, completed };
  return todos[todoIndex];
});

fastify.delete('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  todos = todos.filter(todo => todo.id !== id);
  reply.code(204).send();
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
