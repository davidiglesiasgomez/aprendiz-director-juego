const express = require('express')
const random = require('random')
const app = express()

const cards_suits = ['♠', '♥', '♦', '♣']

const cards_values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']

const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ']

const directions = ['←', '→', '↑', '↓', '↖', '↗', '↘' , '↙', 'O']

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
  return altered_scene_values[value]
    + ( value == 4 ? ': ' + scene_complication() : '' )
    + ( value == 5 ? ': ' + pacing_moves() : '' )
    + ( value == 6 ? ': ' + random_event() : '' )
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
  return pacing_moves_values[value]
    + ( value == 6 ? '. ' + random_event() : '' )
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
    + ( value == 6 ? '' : '' )
}

const random_event = () => {
  return 'What happens: ' + action_focus()
    + ' '
    + 'Involving: ' + topic_focus()
}

const suits_meaning = {
  '♠': 'Physical (appearance, existence)',
  '♥': 'Technical (mental, operation)',
  '♦': 'Mystical (meaning, capability)',
  '♣': 'Social (personal, connection)'
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
  return '(' + value + ') ' + action_focus_values[value[0]] + '. ' + suits_meaning[value[1]]
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
  return '(' + value + ') ' + detail_focus_values[value[0]] + '. ' + suits_meaning[value[1]]
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
  return '(' + value + ') ' + topic_focus_values[value[0]] + '. ' + suits_meaning[value[1]]
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
  return 'What it does: ' + action_focus()
    + ' How it looks: ' + detail_focus()
    + ' How significant: ' + how()
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
  return 'Objective: ' + objective()
    + ' Adversaries: ' + adversaries()
    + ' Rewards: ' + rewards()
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
  return '(' + value + ') ' + npc_identity_values[value[0]] + '. ' + suits_meaning[value[1]]
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
  return '(' + value + ') ' + npc_goal_values[value[0]] + '. ' + suits_meaning[value[1]]
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
  return npc_notable_feature_values[dice(6)]
    + '. ' + detail_focus()
}

const npc_current_situation = () => {
  return 'Attitude to PCs: ' + how()
    + ' Conversation: ' + topic_focus()
}

const dungeon_theme = () => {
  return 'How it looks: ' + detail_focus()
    + ' How it is used: ' + action_focus()
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
  return hex_contents_values[value]
  + ( value == 6 ? '. ' + hex_features() : '' )
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
  return hex_event_values[value]
    + ( value >= 5 ? '. ' + random_event() : '' )
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
    'd100': dice(100),
    'card': card(),
    'rune': runes[random.int(0, 23)],
    'direction': directions[random.int(0, 8)],
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
    'hex_features': hex_features(),
    'hex_event': hex_event(),
  }

}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/oracle', (request, response) => {
  response.json(generator())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})