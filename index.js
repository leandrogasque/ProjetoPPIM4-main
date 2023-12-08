import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();
const server = http.createServer(app);

const porta = 4000;
const host = 'localhost';

var listaUsuarios = [];
//extrair os dados do corpo da requisicao, além de validar os dados
function processarCadastroUsuario(requisicao, resposta) {
  const dados = requisicao.body;
  let conteudoResposta = '';
  //validar os dados enviados
  // a validação dos dados é de responsabilidade do servidor ou da aplicação
  if (!(dados.nome && dados.sobrenome
    && dados.email && dados.dataInicio)) {
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
        <div class="col-md-3">
          <label for="dataInicio" class="form-label">Data Inicio</label>
          <input type="date" class="form-control" id="dataInicio" name="dataInicio" value="${dados.dataInicio}" required>
        </div>
        `;
    if (!dados.dataInicio) {
      conteudoResposta += `
        <div>
          <p class="text-danger">O campo Data Nascimento é obrigatório</p>
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
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      dataInicio: dados.dataInicio,
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
          <h1>Lista de Usuários cadastrados</h1>
          <div class="cotainer">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  
                  <th scope="col">Nome</th>
                  <th scope="col">Apelido</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nascimento</th>  
                </tr>
              </thead>
              <tbody> `;
    for (const usuario of listaUsuarios) {
      conteudoResposta += `
                <tr>      
                  <td>${usuario.nome}</td>
                  <td>${usuario.sobrenome}</td>         
                  <td>${usuario.email}</td>               
                  <td>${usuario.dataInicio}</td>
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
function autenticar(requisicao, resposta, next) {
  if (requisicao.session.usuarioAutenticado) {
    next();
  } else {
    resposta.redirect('/login.html');
  }
}

app.use(cookieParser());
app.use(session({
  secret: 'minhaChaveSecreta', // Substitua pela sua chave secreta
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 15, // 15 minutos
    httpOnly: true, // Impede acesso ao cookie via JavaScript, aumentando a segurança
    sameSite: 'strict' // Ajuda a prevenir ataques CSRF
  }
}));
// ativar a extensao que manipula requisções http
//opcao false ativa a extensão query string
//opcao true ativa a extensão qs (manipula objetos)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'paginas')));


app.get('/', autenticar, (requisicao, resposta) => {
  const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
  const data = new Date();
  app.get('/chat', autenticar, (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, '/chat.html'));
  });

  app.get('/chat', autenticar, (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, '/chat.html'));
  });

  // Rota específica '/enviar-mensagem'
  app.post('/enviar-mensagem', autenticar, (requisicao, resposta) => {
    const mensagem = requisicao.body.mensagem;
    // Lógica para processar a mensagem, por exemplo, enviá-la para o chat HTML
    resposta.status(200).send('Mensagem recebida com sucesso!');
  });

 
  resposta.cookie("DataUltimoAcesso", data.toLocaleString(), {
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
          <a class="btn btn-success col-5 ms-2" href="/chat.html">Bate-papo</a>
        </div>
        <p> Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
        <p id="expiration-info">Seu login irá expirar em: <span id="expiration-date"></span></p>
      </div>
  </main>
  <footer>
  </footer>
  <script>

function calculateExpirationDate() {
    var currentDate = new Date();
    var expirationDate = new Date(currentDate.getTime() + 15 * 60 * 1000); // 15 minutos

    
    var formattedDate = expirationDate.toLocaleString(); 

    
    document.getElementById('expiration-date').textContent = formattedDate;
}


calculateExpirationDate();
</script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
    </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
    </script>
</body>
<footer>
  
</footer>
</html>
`);
})
//endpoint login irá processar o login da aplicação
app.post('/login', (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if (usuario && senha && (usuario === 'admin') && (senha === '123')) {
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



server.listen(porta, host, () => {
  console.log(`Servidor rodando em http://${host}:${porta}`);
});