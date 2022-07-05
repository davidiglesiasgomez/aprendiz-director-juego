const express = require('express')
const cors = require('cors')
const random = require('random')
const path = require('path')
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales')
})

const app = express()

app.use(cors())

const cards_suits = ['♠', '♥', '♦', '♣']

const cards_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']

const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ']
const runes_label = ['Fehu', 'Ur', 'Thurisaz', 'Ansuz', 'Raido', 'Kaunan', 'Gyfu', 'Wynn', 'Haglaz', 'Naudiz', 'Isaz', 'Jēran', 'Eihwaz', 'Peorð', 'Algiz', 'Sowilō', 'Tiwaz', 'Berkanan', 'Ehwaz', 'Mannaz', 'Laguz', 'Yngvi', 'Othala', 'Dagaz']
const runes_meaning = ['livestock,wealth', 'water,rain', 'giant,thorn', 'god,oak,ash', 'ride,journey', 'torch,ulcer', 'gift,spear', 'joy', 'hail', 'need,hardship', 'ice', 'year,harvest,plenty', 'yew', 'pear-wood', 'elk', 'sun', 'tenacity', 'birch', 'horse', 'manm,human', 'lake,ocean,sea,water,waterfall', 'lord', 'heritage,estate', 'day,dawn']

const directions = ['←', '→', '↑', '↓', '↖', '↗', '↘' , '↙', 'O', '-']
const directions_label = ['W', 'E', 'N', 'S', 'NW', 'NE', 'SE', 'SW', 'DIRECT', 'MISS']

const elements = ['🔥', '🌊', '💨', '⛰']
const elements_label = ['Fire', 'Water', 'Air', 'Earth']

const weather_options = ['☀️', '⛅', '🌧️', '⛈️', '🌨️', '🌩️', '🌫️', '❄️', '☁️', '🌪️', '🌈', '💨', '🌀']
const weather_options_label = ['Sun', 'Sun behind Cloud', 'Cloud with Rain', 'Cloud with Lightning and Rain', 'Cloud with Snow', 'Cloud with Lightning', 'Fog', 'Snow', 'Cloud', 'Tornado', 'Rainbow', 'Wind', 'Cyclone']

const symbols_options = ['🏰', '👑', '💗', '💀', '🌞', '🌜', '🗡️', '🛡️', '🎯', '✨']
const symbols_options_label = ['Tower', 'Crown', 'Heart', 'Skull', 'Sun', 'Moon', 'Sword', 'Shield', 'Target', 'Wand']
const symbols_options_meaning = [
    'Significant obstacle; probably static in nature.',
    'An important individual, with power over you.',
    'Family, friendship, or romance.',
    'Impending loss, predictable but hard to avoid.',
    'Clarity or revelation.',
    'Confusion or misunderstanding.',
    'Conflict; not always physical.',
    'Protection; not always physical.',
    'A new goal; a distant or dynamic objective.',
    'Powerful technology or magic.',
]

const scene_complication_values = [
  '',
  'Hostile forces oppose you',
  'An obstacle blocks your way',
  'Wouldn\'t it suck it...',
  'An NPC acts suddenly',
  'All is not as is seems',
  'Things actually go as planned',
]

const scene_complication = () => {
  return scene_complication_values[dice(6)]
}

const altered_scene_values = [
  '',
  'A major detail of the scene is enhanced or somehow worse',
  'The environment is different',
  'Unexpected NPCs are present',
  'Add a SCENE COMPLICATION',
  'Add a PACING MOVE',
  'Add a RANDOM EVENT',
]

const altered_scene = () => {
  value = dice(6)
  return {
    'altered_scene': altered_scene_values[value],
    'scene_complication': ( value === 4 ? scene_complication() : '' ),
    'pacing_moves': ( value === 5 ? pacing_moves() : '' ),
    'random_event': ( value === 6 ? random_event() : '' ),
  }
}

const pacing_moves_values = [
  '',
  'Foreshadow Trouble',
  'Reveal a New Detail',
  'An NPC Takes Action',
  'Advance a Threat',
  'Advance a Plot',
  'Add a RANDOM EVENT to the scene',
]

const pacing_moves = () => {
  value = dice(6)
  return {
    'pacing_moves': pacing_moves_values[value],
    'random_event': ( value === 6 ? random_event() : '' ),
  }
}

const failure_moves_values = [
  '',
  'Cause Harm',
  'Put Someone in a Spot',
  'Offer a Choice',
  'Advance a Threat',
  'Reveal an Unwelcome Truth',
  'Foreshadow Trouble',
]

const failure_moves = () => {
  value = dice(6)
  return failure_moves_values[value]
}

const random_event = () => {
  return {
    'what_happens': action_focus(),
    'involving': topic_focus(),
  }
}

const suits_meaning = {
  '♠': 'Physical',
  '♥': 'Technical',
  '♦': 'Mystical',
  '♣': 'Social'
}

const action_focus_values = {
  '2': 'Seek',
  '3': 'Oppose',
  '4': 'Communicate',
  '5': 'Move',
  '6': 'Harm',
  '7': 'Create',
  '8': 'Reveal',
  '9': 'Command',
  'T': 'Take',
  'J': 'Protect',
  'Q': 'Assist',
  'K': 'Transform',
  'A': 'Deceive',
}

const action_focus = () => {
  value = card()
  return {
    'value': action_focus_values[value[0]],
    'suit': suits_meaning[value[1]],
  }
}

const detail_focus_values = {
  '2': 'Small',
  '3': 'Large',
  '4': 'Old',
  '5': 'New',
  '6': 'Mundane',
  '7': 'Simple',
  '8': 'Complex',
  '9': 'Unsavory',
  'T': 'Specialized',
  'J': 'Unexpected',
  'Q': 'Exotic',
  'K': 'Dignified',
  'A': 'Unique',
}

const detail_focus = () => {
  value = card()
  return {
    'value': detail_focus_values[value[0]],
    'suit': suits_meaning[value[1]],
  }
}

const topic_focus_values = {
  '2': 'Current Need',
  '3': 'Allies',
  '4': 'Community',
  '5': 'History',
  '6': 'Future Plans',
  '7': 'Enemies',
  '8': 'Knowledge',
  '9': 'Rumors',
  'T': 'A Plot Arc',
  'J': 'Recent Events',
  'Q': 'Equipment',
  'K': 'A Faction',
  'A': 'The PCs',
}

const topic_focus = () => {
  value = card()
  return {
    'value': topic_focus_values[value[0]],
    'suit': suits_meaning[value[1]],
  }
}

const dice = (dice) => {
  dice = dice || 6
  return random.int(1, dice)
}

const yes_no = (limit) => {
  limit = limit || 4
  return ( dice(6) >= limit ? 'Yes' : 'No' )
}

const yes_no_mod = () => {
  value = dice(6)
  if ( value === 1 ) return ', but...'
  if ( value === 6 ) return ', and...'
  return ''
}

const how_values = [
  '',
  'Surprisingly lacking',
  'Less than expected',
  'About average',
  'About average',
  'More than expected',
  'Extraordinary',
]

const how = () => {
  value = dice(6)
  return how_values[value]
}

const card = () => {
  return cards_values[random.int(0, 12)] + cards_suits[random.int(0, 3)];
}

const generic_generator = () => {
  return {
    'what_it_does': action_focus(),
    'how_it_looks': detail_focus(),
    'how_significant': how()
  }
}

const objective_values = [
  '',
  'Eliminate a threat',
  'Learn the truth',
  'Recover something valuable',
  'Escort or deliver to safety',
  'Restore something broken',
  'Save an ally in peril',
]

const objective = () => {
  return objective_values[dice(6)]
}

const adversaries_values = [
  '',
  'A powerful organization',
  'Outlaws',
  'Guardians',
  'Local inhabitants',
  'Enemy horde or force',
  'A new or recurring villain',
]

const adversaries = () => {
  return adversaries_values[dice(6)]
}

const rewards_values = [
  '',
  'Money or valuables',
  'Money or valuables',
  'Knowledge and secrets',
  'Support of an ally',
  'Advance a plot arc',
  'A unique item of power',
]

const rewards = () => {
  return rewards_values[dice(6)]
}

const plot_hook_generator = () => {
  return {
    'objective': objective(),
    'adversaries': adversaries(),
    'rewards': rewards()
  }
}

const npc_identity_values = {
  '2': 'Outlaw',
  '3': 'Drifter',
  '4': 'Tradesman',
  '5': 'Commoner',
  '6': 'Soldier',
  '7': 'Merchant',
  '8': 'Specialist',
  '9': 'Entertainer',
  'T': 'Adherent',
  'J': 'Leader',
  'Q': 'Mystic',
  'K': 'Adventurer',
  'A': 'Lord',
}

const npc_identity = () => {
  value = card()
  return {
    'value': npc_identity_values[value[0]],
    'suit': suits_meaning[value[1]],
  }
}

const npc_goal_values = {
  '2': 'Obtain',
  '3': 'Learn',
  '4': 'Harm',
  '5': 'Restore',
  '6': 'Find',
  '7': 'Travel',
  '8': 'Protect',
  '9': 'Enrich Self',
  'T': 'Avenge',
  'J': 'Fulfill Duty',
  'Q': 'Escape',
  'K': 'Create',
  'A': 'Serve',
}

const npc_goal = () => {
  value = card()
  return {
    'value': npc_goal_values[value[0]],
    'suit': suits_meaning[value[1]],
  }
}

const npc_notable_feature_values = [
  '',
  'Unremarkable',
  'Notable nature',
  'Obvious physical trait',
  'Quirk or mannerism',
  'Unusual equipment',
  'Unexpected age or origin',
]

const npc_notable_feature = () => {
  return {
    'npc_notable_feature': npc_notable_feature_values[dice(6)],
    'detail_focus': detail_focus()
  }
}

const npc_current_situation = () => {
  return {
    'attitude_to_pcs': how(),
    'conversation': topic_focus(),
  }
}

const dungeon_theme = () => {
  return {
    'how_it_looks': detail_focus(),
    'how_it_is_used': action_focus(),
    }
}

const dungeon_location_values = [
  '',
  'Typical area',
  'Transitional area',
  'Living area or meeting place',
  'Working or utility area',
  'Area with a special feature',
  'Location for a specialized purpose',
]

const dungeon_location = () => {
  return dungeon_location_values[dice(6)]
}

const dungeon_encounter_values = [
  '',
  'None',
  'None',
  'Hostile enemies',
  'Hostile enemies',
  'An obstacle blocks the way',
  'Unique NPC or adversary',
]

const dungeon_encounter = () => {
  return dungeon_encounter_values[dice(6)]
}

const dungeon_object_values = [
  '',
  'Nothing, or mundane objects',
  'Nothing, or mundane objects',
  'An interesting item or clue',
  'A useful tool, key, or device',
  'Something valuable',
  'Rare or special item',
]

const dungeon_object = () => {
  return dungeon_object_values[dice(6)]
}

const dungeon_total_exits_values = [
  '',
  'Dead end',
  'Dead end',
  '1 additional exit',
  '1 additional exit',
  '2 additional exits',
  '2 additional exits',
]

const dungeon_total_exits = () => {
  return dungeon_total_exits_values[dice(6)]
}

const hex_terrain_values = [
  '',
  'Same as current hex',
  'Same as current hex',
  'Common terrain',
  'Common terrain',
  'Uncommon terrain',
  'Rare terrain',
]

const hex_terrain = () => {
  return hex_terrain_values[dice(6)]
}

const hex_contents_values = [
  '',
  'Nothing notable',
  'Nothing notable',
  'Nothing notable',
  'Nothing notable',
  'Nothing notable',
  'Feature',
]

const hex_contents = () => {
  value = dice(6)
  return {
    'hex_contents': hex_contents_values[value],
    'hex_features': ( value === 6 ? hex_features() : '' ),
  }
}

const hex_features_values = [
  '',
  'Notable structure',
  'Dangerous hazard',
  'A settlement',
  'Strange natural feature',
  'New region (set new terrain types)',
  'DUNGEON CRAWLER entrance',
]

const hex_features = () => {
  return hex_features_values[dice(6)]
}

const hex_event_values = [
  '',
  'None',
  'None',
  'None',
  'None',
  'Random Event',
  'Random Event',
]

const hex_event = () => {
  value = dice(6)
  return {
    'hex_event': hex_event_values[value],
    'random_event': ( value === 5 || value === 6 ? random_event() : '' ),
  }
}

const rune = () => {
  value = random.int(0, runes.length-1)
  return {
    'rune': runes[value],
    'label': runes_label[value],
    'meaning': runes_meaning[value],
  }
}

const element = () => {
  value = random.int(0, elements.length-1)
  return {
    'element': elements[value],
    'label': elements_label[value],
  }
}

const weather = () => {
  value = random.int(0, (weather_options.length-1))
  return {
    'weather': weather_options[value],
    'label': weather_options_label[value],
  }
}

const direction = () => {
  value = random.int(0, directions.length-1)
  return {
    'direction': directions[value],
    'label': directions_label[value],
  }
}

const dice100 = () => {
  value = dice(100).toString()
  if (value === '100') return '00'
  if (value.length === 1) return '0' + value
  return value
}

const symbols = () => {
  values = Array.from(Array(symbols_options.length).keys()).sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    'first': {
      'symbol': symbols_options[values[0]],
      'label': symbols_options_label[values[0]],
      'meaning': symbols_options_meaning[values[0]],
    },
    'second': {
      'symbol': symbols_options[values[1]],
        'label': symbols_options_label[values[1]],
        'meaning': symbols_options_meaning[values[1]],
    },
    'third': {
      'symbol': symbols_options[values[2]],
      'label': symbols_options_label[values[2]],
      'meaning': symbols_options_meaning[values[2]],
    },
  }
}

const generator = () => {
  random.use(Math.round(new Date().getTime()/1000))

  return {
    'd4': dice(4),
    'd6': dice(6),
    'd8': dice(8),
    'd10': dice(10),
    'd12': dice(12),
    'd20': dice(20),
    'd100': dice100(),
    'card': card(),
    'rune': rune(),
    'element': element(),
    'weather': weather(),
    'direction': direction(),
    'symbols': symbols(),
    'scene_complication': scene_complication(),
    'altered_scene': ( dice(6) >= 5 ? altered_scene() : '' ),
    'oracle_yes_no_likely': yes_no(3) + yes_no_mod(),
    'oracle_yes_no_even': yes_no(4) + yes_no_mod(),
    'oracle_yes_no_unlikely': yes_no(5) + yes_no_mod(),
    'oracle_how': how(),
    'pacing_moves': pacing_moves(),
    'failure_moves': failure_moves(),
    'random_event': random_event(),
    'oracle_action_focus': action_focus(),
    'oracle_detail_focus': detail_focus(),
    'oracle_topic_focus': topic_focus(),
    'generic_generator': generic_generator(),
    'plot_hook_generator': plot_hook_generator(),
    'npc_identity': npc_identity(),
    'npc_goal': npc_goal(),
    'npc_notable_feature': npc_notable_feature(),
    'npc_current_situation': npc_current_situation(),
    'dungeon_theme': dungeon_theme(),
    'dungeon_location': dungeon_location(),
    'dungeon_encounter': dungeon_encounter(),
    'dungeon_object': dungeon_object(),
    'dungeon_total_exits': dungeon_total_exits(),
    'hex_terrain': hex_terrain(),
    'hex_contents': hex_contents(),
    // 'hex_features': hex_features(),
    'hex_event': hex_event(),
  }

}

app.get('/', (request, response) => {
  i18n.init(request, response)
  response.send('<h1>' + response.__('Hello World!') + '</h1>')
})

app.get('/oracle', (request, response) => {
  i18n.init(request, response)
  const oracle = generator()
  oracle.element.label = response.__(oracle.element.label)
  oracle.weather.label = response.__(oracle.weather.label)
  oracle.scene_complication = response.__(oracle.scene_complication)
  oracle.altered_scene.altered_scene = response.__(oracle.altered_scene.altered_scene)
  oracle.altered_scene.scene_complication = response.__(oracle.altered_scene.scene_complication)
  if (oracle.altered_scene.pacing_moves) {
    oracle.altered_scene.pacing_moves.pacing_moves = response.__(oracle.altered_scene.pacing_moves.pacing_moves)
  }
  if (oracle.altered_scene.pacing_moves && oracle.altered_scene.pacing_moves.random_event) {
    oracle.altered_scene.pacing_moves.random_event.what_happens.value = response.__(oracle.altered_scene.pacing_moves.random_event.what_happens.value)
    oracle.altered_scene.pacing_moves.random_event.what_happens.suit = response.__(oracle.altered_scene.pacing_moves.random_event.what_happens.suit)
    oracle.altered_scene.pacing_moves.random_event.involving.value = response.__(oracle.altered_scene.pacing_moves.random_event.involving.value)
    oracle.altered_scene.pacing_moves.random_event.involving.suit = response.__(oracle.altered_scene.pacing_moves.random_event.involving.suit)
  }
  if (oracle.altered_scene.random_event) {
    oracle.altered_scene.random_event.what_happens.value = response.__(oracle.altered_scene.random_event.what_happens.value)
    oracle.altered_scene.random_event.what_happens.suit = response.__(oracle.altered_scene.random_event.what_happens.suit)
    oracle.altered_scene.random_event.involving.value = response.__(oracle.altered_scene.random_event.involving.value)
    oracle.altered_scene.random_event.involving.suit = response.__(oracle.altered_scene.random_event.involving.suit)
  }
  oracle.oracle_yes_no_likely = response.__(oracle.oracle_yes_no_likely)
  oracle.oracle_yes_no_even = response.__(oracle.oracle_yes_no_even)
  oracle.oracle_yes_no_unlikely = response.__(oracle.oracle_yes_no_unlikely)
  oracle.oracle_how = response.__(oracle.oracle_how)
  oracle.pacing_moves.pacing_moves = response.__(oracle.pacing_moves.pacing_moves)
  if (oracle.pacing_moves.random_event) {
    oracle.pacing_moves.random_event.what_happens.value = response.__(oracle.pacing_moves.random_event.what_happens.value)
    oracle.pacing_moves.random_event.what_happens.suit = response.__(oracle.pacing_moves.random_event.what_happens.suit)
    oracle.pacing_moves.random_event.involving.value = response.__(oracle.pacing_moves.random_event.involving.value)
    oracle.pacing_moves.random_event.involving.suit = response.__(oracle.pacing_moves.random_event.involving.suit)
  }
  oracle.failure_moves = response.__(oracle.failure_moves)
  oracle.random_event.what_happens.value = response.__(oracle.random_event.what_happens.value)
  oracle.random_event.what_happens.suit = response.__(oracle.random_event.what_happens.suit)
  oracle.random_event.involving.value = response.__(oracle.random_event.involving.value)
  oracle.random_event.involving.suit = response.__(oracle.random_event.involving.suit)
  oracle.oracle_action_focus.value = response.__(oracle.oracle_action_focus.value)
  oracle.oracle_action_focus.suit = response.__(oracle.oracle_action_focus.suit)
  oracle.oracle_detail_focus.value = response.__(oracle.oracle_detail_focus.value)
  oracle.oracle_detail_focus.suit = response.__(oracle.oracle_detail_focus.suit)
  oracle.oracle_topic_focus.value = response.__(oracle.oracle_topic_focus.value)
  oracle.oracle_topic_focus.suit = response.__(oracle.oracle_topic_focus.suit)
  oracle.generic_generator.what_it_does.value = response.__(oracle.generic_generator.what_it_does.value)
  oracle.generic_generator.what_it_does.suit = response.__(oracle.generic_generator.what_it_does.suit)
  oracle.generic_generator.how_it_looks.value = response.__(oracle.generic_generator.how_it_looks.value)
  oracle.generic_generator.how_it_looks.suit = response.__(oracle.generic_generator.how_it_looks.suit)
  oracle.generic_generator.how_significant = response.__(oracle.generic_generator.how_significant)
  oracle.plot_hook_generator.objective = response.__(oracle.plot_hook_generator.objective)
  oracle.plot_hook_generator.adversaries = response.__(oracle.plot_hook_generator.adversaries)
  oracle.plot_hook_generator.rewards = response.__(oracle.plot_hook_generator.rewards)
  oracle.npc_identity.value = response.__(oracle.npc_identity.value)
  oracle.npc_identity.suit = response.__(oracle.npc_identity.suit)
  oracle.npc_goal.value = response.__(oracle.npc_goal.value)
  oracle.npc_goal.suit = response.__(oracle.npc_goal.suit)
  oracle.npc_notable_feature.npc_notable_feature = response.__(oracle.npc_notable_feature.npc_notable_feature)
  oracle.npc_notable_feature.detail_focus.value = response.__(oracle.npc_notable_feature.detail_focus.value)
  oracle.npc_notable_feature.detail_focus.suit = response.__(oracle.npc_notable_feature.detail_focus.suit)
  oracle.npc_current_situation.attitude_to_pcs = response.__(oracle.npc_current_situation.attitude_to_pcs)
  oracle.npc_current_situation.conversation.value = response.__(oracle.npc_current_situation.conversation.value)
  oracle.npc_current_situation.conversation.suit = response.__(oracle.npc_current_situation.conversation.suit)
  oracle.dungeon_theme.how_it_looks.value = response.__(oracle.dungeon_theme.how_it_looks.value)
  oracle.dungeon_theme.how_it_looks.suit = response.__(oracle.dungeon_theme.how_it_looks.suit)
  oracle.dungeon_theme.how_it_is_used.value = response.__(oracle.dungeon_theme.how_it_is_used.value)
  oracle.dungeon_theme.how_it_is_used.suit = response.__(oracle.dungeon_theme.how_it_is_used.suit)
  oracle.dungeon_location = response.__(oracle.dungeon_location)
  oracle.dungeon_encounter = response.__(oracle.dungeon_encounter)
  oracle.dungeon_object = response.__(oracle.dungeon_object)
  oracle.dungeon_total_exits = response.__(oracle.dungeon_total_exits)
  oracle.hex_terrain = response.__(oracle.hex_terrain)
  oracle.hex_contents.hex_contents = response.__(oracle.hex_contents.hex_contents)
  oracle.hex_contents.hex_features = response.__(oracle.hex_contents.hex_features)
  oracle.hex_event.hex_event = response.__(oracle.hex_event.hex_event)
  if (oracle.hex_event.random_event) {
    oracle.hex_event.random_event.what_happens.value = response.__(oracle.hex_event.random_event.what_happens.value)
    oracle.hex_event.random_event.what_happens.suit = response.__(oracle.hex_event.random_event.what_happens.suit)
    oracle.hex_event.random_event.involving.value = response.__(oracle.hex_event.random_event.involving.value)
    oracle.hex_event.random_event.involving.suit = response.__(oracle.hex_event.random_event.involving.suit)
  }
  oracle.direction.label = response.__(oracle.direction.label)
  oracle.symbols.first.label = response.__(oracle.symbols.first.label)
  oracle.symbols.second.label = response.__(oracle.symbols.second.label)
  oracle.symbols.third.label = response.__(oracle.symbols.third.label)
  response.json(oracle)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})