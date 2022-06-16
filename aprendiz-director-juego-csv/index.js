const axios = require('axios').default
const csvWriter = require('csv-writer')
const path = require('path')
const { encode } = require('html-entities')
const numero_cartas = 52

const oracle = async () => {
  const retorno = []
  for (let i=1; i<=numero_cartas; i++) {
    try {
        const response = await axios.get('http://localhost:3001/oracle', {
          'headers': {
            'Accept-language': 'es'
          }
        })
        // console.log('data', response.data)

        retorno.push({
          'number': `${i}/${numero_cartas}`,
          'd4': response.data.d4,
          'd6': response.data.d6,
          'd8': response.data.d8,
          'd10': response.data.d10,
          'd12': response.data.d12,
          'd20': response.data.d20,
          'd100': response.data.d100,
          'card': encode(response.data.card, {mode: 'nonAsciiPrintable', numeric: 'hexadecimal'}),
          'rune': encode(response.data.rune.rune, {mode: 'nonAsciiPrintable', numeric: 'hexadecimal'}),
          'rune_label': encode(response.data.rune.label, {mode: 'nonAsciiPrintable', numeric: 'hexadecimal'}),
          'direction': encode(response.data.direction.direction, {mode: 'nonAsciiPrintable', numeric: 'hexadecimal'}),
          'scene_complication': response.data.scene_complication,
          'altered_scene': response.data.altered_scene.altered_scene || '',
          'oracle_yes_no_likely': response.data.oracle_yes_no_likely,
          'oracle_yes_no_even': response.data.oracle_yes_no_even,
          'oracle_yes_no_unlikely': response.data.oracle_yes_no_unlikely,
          'oracle_how': response.data.oracle_how,
          'pacing_moves': response.data.pacing_moves.pacing_moves,
          'failure_moves': response.data.failure_moves,
          'random_event_what_happens': `${response.data.random_event.what_happens.value}. ${response.data.random_event.what_happens.suit}`,
          'random_event_involving': `${response.data.random_event.involving.value}. ${response.data.random_event.involving.suit}`,
          'oracle_action_focus': `${response.data.oracle_action_focus.value}. ${response.data.oracle_action_focus.suit}`,
          'oracle_detail_focus': `${response.data.oracle_detail_focus.value}. ${response.data.oracle_detail_focus.suit}`,
          'oracle_topic_focus': `${response.data.oracle_topic_focus.value}. ${response.data.oracle_topic_focus.suit}`,
        })

    } catch (err) {
        console.error('err', err)

    }
  }
  return retorno
};

const cards = oracle()
cards.then(cards => {
  // console.log('cards', cards)

  const writer = csvWriter.createObjectCsvWriter({
    path: path.resolve(__dirname, 'cards.csv'),
    header: [
      { id: 'number', title: 'number' },
      { id: 'd4', title: 'd4' },
      { id: 'd6', title: 'd6' },
      { id: 'd8', title: 'd8' },
      { id: 'd10', title: 'd10' },
      { id: 'd12', title: 'd12' },
      { id: 'd20', title: 'd20' },
      { id: 'd100', title: 'd100' },
      { id: 'card', title: 'card' },
      { id: 'rune', title: 'rune' },
      { id: 'rune_label', title: 'rune_label' },
      { id: 'direction', title: 'direction' },
      { id: 'scene_complication', title: 'scene_complication' },
      { id: 'altered_scene', title: 'altered_scene' },
      { id: 'oracle_yes_no_likely', title: 'oracle_yes_no_likely' },
      { id: 'oracle_yes_no_even', title: 'oracle_yes_no_even' },
      { id: 'oracle_yes_no_unlikely', title: 'oracle_yes_no_unlikely' },
      { id: 'oracle_how', title: 'oracle_how' },
      { id: 'pacing_moves', title: 'pacing_moves' },
      { id: 'failure_moves', title: 'failure_moves' },
      { id: 'random_event_what_happens', title: 'random_event_what_happens' },
      { id: 'random_event_involving', title: 'random_event_involving' },
      { id: 'oracle_action_focus', title: 'oracle_action_focus' },
      { id: 'oracle_detail_focus', title: 'oracle_detail_focus' },
      { id: 'oracle_topic_focus', title: 'oracle_topic_focus' },
    ],
  })

  writer.writeRecords(cards).then(() => {
    console.log('Done!')
  })
})


