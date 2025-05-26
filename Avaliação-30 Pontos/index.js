const express = require('express');
const myslq = require('mysql2');


const app = express();

app.use(express.json());

const conexao = myslq.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'centro_treinamento'
})

app.use(express.json())

app.post('/sessoes', (req, res) => {
    const sessao = {
        aluno: req.body.aluno,
        personal: req.body.personal,
        tipo_treino: req.body.tipo_treino,
        data: req.body.data,
        horario: req.body.horario,
        observacoes: req.body.observacoes,
    }
    if (!sessao.aluno || typeof sessao.aluno != 'string' || sessao.aluno.trim() == '') {
        return res.status(400).send('Nome do aluno é obrigatório e deve ser uma string não vazia.');
    }
    if (!sessao.personal || typeof sessao.personal  != 'string' || sessao.personal .trim() == '') {
        return res.status(400).send('Nome do personal é obrigatório e deve ser uma string não vazia.');
    }

    if (!sessao.tipo_treino|| typeof sessao.tipo_treino != 'string' || sessao.tipo_treino .trim() == '') {
        return res.status(400).send('o tipo de treino é obrigatório e deve ser uma string não vazia.');
    }

    if (!sessao.data|| typeof sessao.data != 'string' || sessao.data .trim() == '') {
        return res.status(400).send('A data da sessão é obrigatória.');
    }
    if (!sessao.horario|| typeof sessao.horario != 'string' || sessao.horario .trim() == '') {
        return res.status(400).send('O horario da sessão é obrigatória..');
    }
    

    conexao.query(
        'INSERT INTO sessoes(aluno,personal,tipo_treino,data,horario,observacoes) VALUES (?,?,?,?,?,?)',
    
        [ sessao.aluno, sessao.personal, sessao.tipo_treino,sessao.data,sessao.horario,sessao.observacoes],
        () => {
            res.status(201).send('sessão marcada com sucesso!')

        }
    );

})
 

app.get('/sessoes', (req, res) => {
   conexao.query('SELECT * FROM sessoes', (err, results) => {
    if (err){
        return res.status(500).send('Erro ao buscar sessão');
    }
    res.status(200).send(results);
   })
});

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})