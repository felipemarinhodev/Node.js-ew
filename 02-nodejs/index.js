/**
 * 0 - Obter um usuário
 * 1 - Preciso obter o número de telefone de um usuário a partir de seu id
 * 2 - Obter o endereço do usuário pelo Id
 */

function obterUsuario(callback) {
	setTimeout(function() {
		return callback(null, {
			id: 1,
			nome: 'Thanos',
			dataNascimento: new Date(),
		})
	}, 1000)
}

function obterTelefone(idUsuario, callback) {
	setTimeout(function() {
		return callback(null, {
			telefone: '999999999',
			ddd: 11
		}
	)}, 2000)
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'Vormir',
			numero: 69
		})
	}, 2000)
}

// o Padrão callback fala que o primeiro parametro é o erro e o segundo é o sucesso.
function resolverUsuario(erro, usuario) {
	console.log('resolverUsuario> usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
	// null || "" || 0 ===  false
	if (error) {
		console.error('Deu ruim em usuario', error);
		return;
	}

	obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
		if (error1) {
			console.error('Deu ruim em usuario', error1);
			return;
		}
		obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
			if (error2) {
				console.error('Deu ruim em usuario', error2);
				return;
			}
			console.log(`
				nome: ${usuario.nome},
				Endereco: ${endereco.rua}, ${endereco.numero}
				Telefone: (${telefone.ddd}) ${ telefone.telefone}
			`);
		});
	});
	
})
// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);
