const express = require('express')
const port = 3001
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

const app = express()

// this line allows us to get info from the form data in the body
app.use(express.urlencoded({ extended: true }))
// this line allows us to get info from JSON in the body
app.use(express.json())
// allows us to use put, patch and delete in our forms
app.use(methodOverride('_method'))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
  {
    id: uuidv4(),
    username: 'JohnDoe',
    comment: 'This is a great website!'
  },
  {
    id: uuidv4(),
    username: 'JaneSmith',
    comment: 'I learned so much from this article!'
  },
  {
    id: uuidv4(),
    username: 'MikeJohnson',
    comment: 'I have a question about this topic. Can anyone help?',
  },

  {
    id: uuidv4(),
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

app.get('/comments/:id', (req, res) => {
  const { id } = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params
  const newCommentText = req.body.comment
  const foundComment = comments.find(c => c.id === id)
  foundComment.comment = newCommentText
  res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params
  comments = comments.filter((c) => c.id !== id )
  res.redirect('/comments')
})

app.post('/comments', (req, res) => {
  const { username, comment } = req.body
  comments.push({ username, comment, id: uuidv4()})
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
