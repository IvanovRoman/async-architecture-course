console.time('appstart');
const server = require('../Server/index.js');
const mongoose = require('$Modules/Mongoose')

const App = new class {
	init() {
		const env = process.env.env || 'dev';
		const service = 'task_tracker';
		const config = require('../../common-packages/Config')(env);
		const port = config[service].port;
		mongoose.connectDB()
			.then( () => {
				server.startServer(port);
				require('$Routes/index');
				console.timeEnd('appstart');
				console.log(module.filename, `listening on *: ${port}`);
			});
	}
};

App.init();

module.exports = App;
