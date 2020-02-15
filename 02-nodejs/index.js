/**
 * 0 - Obter um usuário
 * 1 - Preciso obter o número de telefone de um usuário a partir de seu id
 * 2 - Obter o endereço do usuário pelo Id
 */
// importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

// obterEnderecoAsync.then()

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

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then()
// para manipular os erros, usamos o .catch()
// usuario -> telefone -> telefone
usuarioPromise
	.then(function (usuario) {
		return obterTelefone(usuario.id)
			.then(function resolveTelefone(result) {
				return {
					usuario: {
						...usuario,
					},
					telefone: {
						...result
					}
				}
		})
	})
	.then(function(resultado) {
		const endereco = obterEnderecoAsync(resultado.usuario.id)

			return endereco
				.then(function resolverEndereco(endereco) {
					return {
						...resultado,
						endereco: {
							...endereco
						}
					}
				})
	})
	.then(function (resultado) {
		console.log(`
			Nome: ${resultado.usuario.nome}
			Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
			Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
		`);
	})
	.catch(function (error) {
		console.error('Deu Ruim', error);
	})
