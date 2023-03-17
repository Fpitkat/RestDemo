const express = require('express')
const port = 3001
const path = require('path')

const app = express()

// this line allows us to get info from the form data in the body
app.use(express.urlencoded({ extended: true }))
// this line allows us to get info from JSON in the body
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const comments = [
  { username: 'JohnDoe', comment: 'This is a great website!' },
  { username: 'JaneSmith', comment: 'I learned so much from this article!' },
  {
    username: 'MikeJohnson',
    comment: 'I have a question about this topic. Can anyone help?',
  },
  {
    username: 'SaraLee',
    comment: 'Thanks for sharing this useful information!',
  },
]

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

app.post('/comments', (req, res) => {
  const { username, comment } = req.body
  comments.push({ username, comment })

  // this line sends us back to the comments path
  res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
  res.send('GET /tacos reponse')
})

app.post('/tacos', (req, res) => {
  const { meat, qty } = req.body
  res.send(`your order contains ${qty} ${meat} tacos`)
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
