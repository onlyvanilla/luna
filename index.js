const { Client, Collection, GatewayIntentBits } = require('discord.js');
const glob = require('glob');
const globPromise = require('util').promisify(glob);
const process = require('process');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    failIfNotExists: false,
});

client.login(process.env.TOKEN);

client.commands = new Collection();

const pastaSlash = 'slash';
const pastaEventos = 'events';
const serverTestesSlash = '959906461599797348';

client.on('ready', async () => {

    const comandos = await globPromise(`./src/${pastaSlash}/**/*.js`);
    const eventos = await globPromise(`./src/${pastaEventos}/**/*.js`);
    const comandosRegistrar = [];

    for (const file of eventos) {

        const ev = require(file);
        client.on(ev.name, (...args) => ev.execute(...args));
        console.log(`Evento ${ev.name} carregado`);

    }

    comandos.forEach(c => {

        const cmd = require(c);
        const [ nomeArquivo ] = c.split('/').slice(-1);

        if (!nomeArquivo.includes(' ')) {
            // Os arquivos que tem espaço no nome são código de subcomandos
            // e não devem ser registrados
            comandosRegistrar.push(cmd);
        }

        if (!cmd.base) {
            // Arquivos com base true não devem ser entendidos como código executavel por bot
            client.commands.set(cmd.name, cmd);
            console.log(`${cmd.name} carregado`);

        }

    });

    await client.application.commands.set(comandosRegistrar);

    const serverTestes = client.guilds.cache.get(serverTestesSlash);

    if (!serverTestes) console.log('Server de testes slash não encontrado');
    else {
        await serverTestes.commands.set(comandosRegistrar);
        console.log(`Slash registrado no server ${serverTestes.name} com sucesso`);
    }

    // console.log(commands);

    console.log(`${client.user.tag} online`);

});


process.on('unhandledRejection', (a, b) => {

    console.log(a);
    console.log(b);

});

