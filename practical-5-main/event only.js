// event-only.js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(Hello, ${name}! Welcome to Node.js Events.);
});

// emit the event
emitter.emit('greet', 'Ishan');
