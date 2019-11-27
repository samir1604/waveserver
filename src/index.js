const app = require('./app');

async function main() {
    await app.listen(app.get('port'));
    console.log(`App ${app.get('appName')}`);
    console.log(`Server on port, ${app.get('port')}`);
}

main();
