import express from 'express';

const app = express();
const PORT = 3000;
const users = [
    'carlos',
    'juan',
    'pedro',
    'jose',
    'luis',
    'juan',
]

const numberRandom = () => {
    const numero = Math.floor(Math.random() * (4)) + 1
    return numero
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

/* 
MIDDLEWARES
*/
app.use(express.static('public'))

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    if(users.includes(usuario)){
        next();
    }else{
        res.redirect('/who.jpeg');
    }
})

/* 
ROUTES
*/
app.get('/abracadabra/:usuario', (req, res) => {
    res.send({users})
})

app.get('/abracadabra/juego/:usuario', async (req, res) => {
    res.send(`
      <html>
        <body>
          <h1>has elegido a un usuario dentro de nuestra lista!!!</h1>
          <img src="/sombrero.png" alt="Sombrero">
          <script>
            setTimeout(function() {
              window.location.href = '/';
            }, 3000);
          </script>
        </body>
      </html>
    `);
  });
  
app.get('/', async (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.get('/abracadabra/conejo/:n', (req, res) => {
    let n = req.params.n
    let numero = numberRandom()
    //res.send([n, numero])
    n == numero ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg');
    
})

app.use('*', (req, res) => {
    res.status(404).send('<h1>Esta página no existe...</h1>');
})
