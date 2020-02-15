// Eventos serve para ações continuas, clicks, arquivos ou alguns outros tipos de informações também.
const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, function (click) {
	console.log('Um usuario clicou', click);
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(function () {
// 	meuEmissor.emit(nomeEvento, 'no ok ' + (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', function (value) {
	console.log(`Você digitou: ${value.toString().trim()}`);
})

/*
// Erro comum - usar promise em eventos.
function main() {
	return new Promise(function (resolve, reject) { // A Promise é feita para executar uma vez.
		stdin.addListener('data', function (value) {
			return resolve(value)
		})
	})
}

main().then(function (resultado) {
	console.log('resultado', resultado.toString());
})
*/