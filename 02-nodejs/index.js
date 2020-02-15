/**
 * 0 - Obter um usuário
 * 1 - Preciso obter o número de telefone de um usuário a partir de seu id
 * 2 - Obter o endereço do usuário pelo Id
 */
// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
	// quando der algum problema -> reject(erro)
	// qaundo success -> resolve
	return new Promise(
		function resolvePromise(resolve, reject) {
			setTimeout(function() {
				// return reject(new Error('Deu ruim de verdade'));
				return resolve({
					id: 1,
					nome: 'Thanos',
					dataNascimento: new Date(),
				})
			}, 1000)
		}
	)

}

function obterTelefone(idUsuario) {
	return new Promise(function resolverPromise(resolve, reject) {
		setTimeout(function() {
			return resolve({
				telefone: '999999999',
				ddd: 11
			}
		)}, 2000)
	})
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'Vormir',
			numero: 69
		})
	}, 2000)
}

// 1º passo, adicionar a palavra async -> automaticamente ela retornará uma Promise
main();
async function main() {
	try {
		console.time('medida-promise')
		const usuario = await obterUsuario();
		// Não é necessário utilizar o await nos exemplos abaixo, pois eles não dependem um do outro para isso utilizamos o Promise.all
		// const telefone = await obterTelefone(usuario.id);
		// const endereco = await obterEnderecoAsync(usuario.id);
		const resultado = await Promise.all([
			obterTelefone(usuario.id),
			obterEnderecoAsync(usuario.id)
		])
		const [telefone, endereco] = resultado;
		console.log(`
			Nome: ${usuario.nome}
			Telefene: (${telefone.ddd}) ${telefone.telefone}
			Endereço: ${endereco.rua}, ${endereco.numero}
		`);
		console.timeEnd('medida-promise')
	} catch (error) {
		console.error('catch - Deu Ruim', error);
		
	}
}
