const express = require('express')
const random = require('random')
const app = express()

const generator = () => {

  const cartas_palos = ['♠', '♥', '♦', '♣']
  const cartas_valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const runas = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ']
  const flechas = ['←', '→', '↑', '↓', '↖', '↗', '↘' , '↙', 'O']

  random.use(Math.round(new Date().getTime()/1000))

  return {
    'd4': random.int(1, 4),
    'd6': random.int(1, 6),
    'd8': random.int(1, 8),
    'd10': random.int(1, 10),
    'd12': random.int(1, 12),
    'd20': random.int(1, 20),
    'd100': random.int(1, 100),
    'carta': cartas_valores[random.int(0, 12)] + cartas_palos[random.int(0, 3)],
    'runa': runas[random.int(0, 23)],
    'flecha': flechas[random.int(0, 8)],
  }

}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(generator())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})