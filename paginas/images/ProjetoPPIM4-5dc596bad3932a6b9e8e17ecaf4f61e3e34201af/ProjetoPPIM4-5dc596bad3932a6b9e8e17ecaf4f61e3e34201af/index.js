import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 4000;
const host = 'localhost' || '0.0.0.0';

var listaUsuarios = [];
//extrair os dados do corpo da requisicao, além de validar os dados
function processarCadastroUsuario(requisicao, resposta) {
const dados = requisicao.body;
let conteudoResposta = '';
//validar os dados enviados
// a validação dos dados é de responsabilidade do servidor ou da aplicação
if (!(dados.ra && dados.nome && dados.sobrenome && dados.cidade && dados.estado && dados.cep &&
dados.telefone && dados.email && dados.evento && dados.dataInicio && dados.dataFim)) {
//estão faltando dados do usuario!
conteudoResposta = `
<!doctype html>
<html lang="pt-br">

<head>
  <title>Cadastro de Eventos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <script src="MascarasValidaCPF.js"></script>
</head>

<body>
  <header>
  </header>
  <main class="background">
    <div class="container mt-4 col-8">
      <h1>Cadastro De Alunos em Eventos Universitários</h1>
      <form action='/cadastro' method='POST' class="row g-3 needs-validation mt-4" novalidate>
        <div class="col-md-2">
          <label for="nome" class="form-label">RA</label>
          <input type="text" class="form-control" id="ra" name="ra"  value="${dados.ra}" required>
        </div>
        `;
        if (!dados.ra) {
        conteudoResposta += `<div>
          <p class="text-danger">O campo R.A é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-4">
          <label for="nome" class="form-label">Nome</label>
          <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
        </div>
        `;
        if (!dados.nome) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Nome é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-6">
          <label for="sobrenome" class="form-label">Sobrenome</label>
          <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${dados.sobrenome}" required>
        </div>
        `;
        if (!dados.sobrenome) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Sobrenome é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-6">
          <label for="cidade" class="form-label">Cidade</label>
          <input type="text" class="form-control" id="cidade" name="cidade" value="${dados.cidade}" required>
        </div>
        `;
        if (!dados.cidade) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Cidade é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="estado" class="form-label">UF</label>
          <select class="form-select" id="estado" name="estado" value="${dados.estado}" required>
            <option selected disabled value="">Escolha</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
          </select>
        </div>
        `;
        if (!dados.estado) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo UF é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="cep" class="form-label">CEP</label>
          <input type="text" class="form-control" id="cep" name="cep"  value="${dados.cep}" required>
        </div>
        `;
        if (!dados.cep) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo CEP é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="telefone" class="form-label">Telefone</label>
          <input type="text" class="form-control" id="telefone" name="telefone" value="${dados.telefone}" required>
        </div>
        `;
        if (!dados.telefone) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Telefone é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-6">
          <label for="email" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" name="email" value="${dados.email}" required>
        </div>
        `;
        if (!dados.email) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Email é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-6">
          <label for="evento" class="form-label">Evento</label>
          <input type="text" class="form-control" id="evento" name="evento" value="${dados.evento}" required>
        </div>
        `;
        if (!dados.evento) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Evento é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="dataInicio" class="form-label">Data Inicio</label>
          <input type="date" class="form-control" id="dataInicio" name="dataInicio" value="${dados.dataInicio}" required>
        </div>
        `;
        if (!dados.dataInicio) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Data Inicio é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="horaInicio" class="form-label">Hora</label>
          <input type="time" class="form-control" id="horaInicio" name="horaInicio" value="${dados.horaInicio}" required>
        </div>`;
        if (!dados.horaInicio) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Hora é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="dataFim" class="form-label">Data Fim</label>
          <input type="date" class="form-control" id="dataFim" name="dataFim" value="${dados.dataFim}" required>
        </div>
        `;
        if (!dados.dataFim) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Data Fim é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-md-3">
          <label for="horaFim" class="form-label">Hora</label>
          <input type="time" class="form-control" id="horaFim" name="horaFim" value="${dados.horaFim}" required>
        </div>
        `;
        if (!dados.horaFim) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Hora Fim é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" name="inavalidCheck" value="${dados.inavalidCheck}" required>
            <label class="form-check-label" for="invalidCheck">
              Concordo com os termos e condições.
            </label>
          </div>
        </div>
        `;
        if (!dados.inavalidCheck) {
        conteudoResposta += `
        <div>
          <p class="text-danger">O campo Concordo com os termos e condições é obrigatório</p>
        </div>`;
        }
        conteudoResposta += `
        <div class="col-12">
          <button class="btn btn-primary col-12" type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </main>
  <footer>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>

</html>`;
resposta.end(conteudoResposta);
}
else {
const usuario = {
ra: dados.ra,
nome: dados.nome,
sobrenome: dados.sobrenome,
cidade: dados.cidade,
estado: dados.estado,
cep: dados.cep,
telefone: dados.telefone,
email: dados.email,
evento: dados.evento,
dataInicio: dados.dataInicio,
dataFim: dados.dataFim,
}
listaUsuarios.push(usuario);
//retorna a lista de usuarios para o cliente
conteudoResposta = `
<!doctype html>
<html lang="pt-br">

<head>
  <title>Listagem de Cadastro em Eventos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header>
  </header>
  <main class="background">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Lista de Pessoas Cadastradas em Eventos Da Unoeste</h1>
          <div class="cotainer">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">RA</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sobrenome</th>
                  <th scope="col">Cidade</th>
                  <th scope="col">UF</th>
                  <th scope="col">CEP</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Evento</th>
                  <th scope="col">Inicio</th>
                  <th scope="col">Fim</th>
                </tr>
              </thead>
              <tbody> `;
                for (const usuario of listaUsuarios) {
                conteudoResposta += `
                <tr>
                  <td>${usuario.ra}</td>
                  <td>${usuario.nome}</td>
                  <td>${usuario.sobrenome}</td>
                  <td>${usuario.cidade}</td>
                  <td>${usuario.estado}</td>
                  <td>${usuario.cep}</td>
                  <td>${usuario.telefone}</td>
                  <td>${usuario.email}</td>
                  <td>${usuario.evento}</td>
                  <td>${usuario.dataInicio}</td>
                  <td>${usuario.dataFim}</td>
                </tr>
                `;
                }

                conteudoResposta += `
              </tbody>
            </table>
            <a class="btn btn-danger" href="/" role="button">Voltar</a>
            <a class="btn btn-primary" href="/cadastro.html" role="button">Continuar Cadastrando</a>
          </div>
        </div>
      </div>
  </main>
  <footer>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>

</html>`;
resposta.end(conteudoResposta);
}
}
//pseudo middleware
function autenticar(requisicao, resposta, next){
  if (requisicao.session.usuarioAutenticado){
    next();
  }
  else{
    resposta.redirect('/login.html');
  }
}
const app = express();
app.use(cookieParser());

app.use(session({
  secret: 'minhasenha',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 15 //15 minutos
  }
}))
// ativar a extensao que manipula requisções http
//opcao false ativa a extensão query string
//opcao true ativa a extensão qs (manipula objetos)
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'paginas')));

app.get('/', autenticar,  (requisicao, resposta) => {
  const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
  const data = new Date();
resposta.cookie("DataUltimoAcesso", data.toLocaleString(),{
  maxAge: 1000 * 60 * 60 * 24 * 30,
  httpOnly: true,
});
resposta.end(`
<!doctype html>
<html lang="pt-br">

<head>
  <title>MENU</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <link rel="stylesheet" href="style2.css">
</head>

<body>
  <header>
  </header>
  <main class="background">
    <div class="container">
      <div class="row">
        <div class="col-10 text-center">
          <h1> Escolha a Opção desejada</h1>
        </div>
        <div>
          <a class="btn btn-primary col-5" href="/cadastro.html">Cadastro</a>
        </div>
      </div>
  </main>
  <footer>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>
<footer>
  <p> Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
</footer>
</html>
`);
})
//endpoint login irá processar o login da aplicação
app.post('/login', (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario && senha && (usuario === 'admin') && (senha === '123')){
    requisicao.session.usuarioAutenticado = true;
    resposta.redirect('/');
  }
  else {
    resposta.end(`
    <!doctype html>
    <html lang="pt-br">
     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Faalha na Autenticação</title>
      </head> 
      <body>
        <h1> Usuário ou senha inválidos!</h1>
        <a href="/login.html">Voltar</a>
      </body>
    </html>

    `)
  }
});
//rota para processar o cadastro de usuario endpoint = /cadastro

app.post('/cadastro', autenticar, processarCadastroUsuario);



app.listen(porta, host, () => {
console.log(`Servidor rodando em http://${host}:${porta}`);
});