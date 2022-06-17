const axios = require('axios').default
const csvWriter = require('csv-writer')
const path = require('path')
const { encode } = require('html-entities')

const codificarHex = (cadena) => {
  return encode(cadena, {mode: 'nonAsciiPrintable', numeric: 'hexadecimal'})
}

const codificarTexto = (cadena) => {
  return cadena
}

const npc = (data) => {
  return data.npc_identity.value
    + '. ' + data.npc_identity.suit
    + '. ' + data.npc_goal.value
    + '. ' + data.npc_goal.suit
    + '. ' + data.npc_notable_feature.npc_notable_feature
    + '. ' + data.npc_notable_feature.detail_focus.value
    + '. ' + data.npc_notable_feature.detail_focus.suit
    + '. ' + data.npc_current_situation.attitude_to_pcs
    + '. ' + data.npc_current_situation.conversation.value
    + '. ' + data.npc_current_situation.conversation.suit
}

const hex = (data) => {
  return data.hex_terrain
    + ( data.hex_contents.hex_contents !== 'Característica' ? '. ' + data.hex_contents.hex_contents : '' )
    + ( data.hex_contents.hex_contents === 'Característica' ? '. ' + data.hex_contents.hex_features : '' )
    + ( data.hex_event.hex_event === 'Evento Aleatorio' ? '. ' + data.hex_event.hex_event : '' )
}

const dungeon = (data) => {
  return data.dungeon_location
    + ( data.dungeon_encounter !== 'Ninguno' ? '. ' + data.dungeon_encounter : '' )
    + '. ' + data.dungeon_object
    + '. ' + data.dungeon_total_exits
}

const cards_suits = ['♥', '♠', '♦', '♣']
const cards_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
const baraja = []
for (let i=0; i<cards_suits.length; i++) {
  for (let j=0; j<cards_values.length; j++) {
    baraja.push(cards_values[j] + cards_suits[i])
  }
}
baraja.push('J')
baraja.push('J')
// console.log('baraja', baraja)

const numero_cartas = 54
// const numero_cartas = 108
// const numero_cartas = 162

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
          'card': codificarHex(baraja[((i-1)%baraja.length)]),
          'rune': codificarHex(response.data.rune.rune),
          'rune_label': codificarTexto(response.data.rune.label),
          'direction': codificarHex(response.data.direction.direction),
          'direction_label': codificarTexto(response.data.direction.label),
          'element': codificarHex(response.data.element.element),
          'element_label': codificarTexto(response.data.element.label),
          'weather': codificarHex(response.data.weather.weather),
          'weather_label': codificarTexto(response.data.weather.label),
          'scene_complication': codificarTexto(response.data.scene_complication),
          'altered_scene': codificarTexto(response.data.altered_scene.altered_scene) || '',
          'oracle_yes_no_likely': codificarTexto(response.data.oracle_yes_no_likely),
          'oracle_yes_no_even': codificarTexto(response.data.oracle_yes_no_even),
          'oracle_yes_no_unlikely': codificarTexto(response.data.oracle_yes_no_unlikely),
          'oracle_how': codificarTexto(response.data.oracle_how),
          'pacing_moves': codificarTexto(response.data.pacing_moves.pacing_moves),
          'failure_moves': codificarTexto(response.data.failure_moves),
          'random_event_what_happens': codificarTexto(`${response.data.random_event.what_happens.value}. ${response.data.random_event.what_happens.suit}`),
          'random_event_involving': codificarTexto(`${response.data.random_event.involving.value}. ${response.data.random_event.involving.suit}`),
          'oracle_action_focus': codificarTexto(`${response.data.oracle_action_focus.value}. ${response.data.oracle_action_focus.suit}`),
          'oracle_detail_focus': codificarTexto(`${response.data.oracle_detail_focus.value}. ${response.data.oracle_detail_focus.suit}`),
          'oracle_topic_focus': codificarTexto(`${response.data.oracle_topic_focus.value}. ${response.data.oracle_topic_focus.suit}`),
          'plot_hook_generator': codificarTexto(`${response.data.plot_hook_generator.objective}. ${response.data.plot_hook_generator.adversaries}. ${response.data.plot_hook_generator.rewards}`),
          'npc_identity': codificarTexto(`${response.data.npc_identity.value}. ${response.data.npc_identity.suit}`),
          'npc_goal': codificarTexto(`${response.data.npc_goal.value}. ${response.data.npc_goal.suit}`),
          'npc_notable_feature': codificarTexto(`${response.data.npc_notable_feature.npc_notable_feature}. ${response.data.npc_notable_feature.detail_focus.value}. ${response.data.npc_notable_feature.detail_focus.suit}`),
          'npc_attitude_to_pcs': codificarTexto(`${response.data.npc_current_situation.attitude_to_pcs}`),
          'npc_conversation': codificarTexto(`${response.data.npc_current_situation.conversation.value}. ${response.data.npc_current_situation.conversation.suit}`),
          'dungeon': codificarTexto(dungeon(response.data)),
          'hex': codificarTexto(hex(response.data)),
          'dungeon_theme_how_it_looks': codificarTexto(`${response.data.dungeon_theme.how_it_looks.value}. ${response.data.dungeon_theme.how_it_looks.suit}`),
          'dungeon_theme_how_it_is_used': codificarTexto(`${response.data.dungeon_theme.how_it_is_used.value}. ${response.data.dungeon_theme.how_it_is_used.suit}`),
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
    path: path.resolve(__dirname, '../nandeck/cards.csv'),
    encoding: 'ascii',
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
      { id: 'direction_label', title: 'direction_label' },
      { id: 'element', title: 'element' },
      { id: 'element_label', title: 'element_label' },
      { id: 'weather', title: 'weather' },
      { id: 'weather_label', title: 'weather_label' },
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
      { id: 'plot_hook_generator', title: 'plot_hook_generator' },
      { id: 'npc_identity', title: 'npc_identity' },
      { id: 'npc_goal', title: 'npc_goal' },
      { id: 'npc_notable_feature', title: 'npc_notable_feature' },
      { id: 'npc_attitude_to_pcs', title: 'npc_attitude_to_pcs' },
      { id: 'npc_conversation', title: 'npc_conversation' },
      { id: 'dungeon', title: 'dungeon' },
      { id: 'hex', title: 'hex' },
      { id: 'dungeon_theme_how_it_looks', title: 'dungeon_theme_how_it_looks' },
      { id: 'dungeon_theme_how_it_is_used', title: 'dungeon_theme_how_it_is_used' },
    ],
  })

  writer.writeRecords(cards).then(() => {
    console.log('Done!')
  })
})


