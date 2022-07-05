import { useState, useEffect } from 'react'
import oracleService from './services/oracle'

function App() {
  const [oracle, setOracle] = useState(null)

  useEffect(() => {
    oracleService
      .get()
      .then(response => {
        setOracle(response.data)
      })
  }, [])

  // console.log('oracle', oracle)

  if (oracle === null) {
    return <><h1>One Page Solo Engine</h1>Loading...</>
  }

  return (
    <>
      <h1>One Page Solo Engine</h1>

      <table>
      <tbody>
        <tr>
            <th>d3</th>
            <th>d4</th>
            <th>d6</th>
            <th>d8</th>
            <th>d10</th>
            <th>d12</th>
            <th>d20</th>
            <th>d100</th>
            <th>carta</th>
            <th>runa</th>
            <th>dirección</th>
            <th>elemento</th>
            <th>clima</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        <tr>
            <td>{oracle.d3}</td>
            <td>{oracle.d4}</td>
            <td>{oracle.d6}</td>
            <td>{oracle.d8}</td>
            <td>{oracle.d10}</td>
            <td>{oracle.d12}</td>
            <td>{oracle.d20}</td>
            <td>{oracle.d100}</td>
            <td>{oracle.card}</td>
            <td><span title={oracle.rune.label}>{oracle.rune.rune}</span></td>
            <td><span title={oracle.direction.label}>{oracle.direction.direction}</span></td>
            <td><span title={oracle.element.label}>{oracle.element.element}</span></td>
            <td><span title={oracle.weather.label}>{oracle.weather.weather}</span></td>
            <td><span title={oracle.symbols.first.label}>{oracle.symbols.first.symbol}</span></td>
            <td><span title={oracle.symbols.second.label}>{oracle.symbols.second.symbol}</span></td>
            <td><span title={oracle.symbols.third.label}>{oracle.symbols.third.symbol}</span></td>
        </tr>
      </tbody>
      </table>

      <p>Oráculo (SÍ/NO)</p>
        <p>Probable <strong>{oracle.oracle_yes_no_likely}</strong></p>
        <p>Igualado <strong>{oracle.oracle_yes_no_even}</strong></p>
        <p>Improbable <strong>{oracle.oracle_yes_no_unlikely}</strong></p>

      <p>Oráculo (CÓMO) <strong>{oracle.oracle_how}</strong></p>

      <p>Oráculo (FOCO DE ACCIÓN) <strong>{oracle.oracle_action_focus.value} ({oracle.oracle_action_focus.suit})</strong></p>

      <p>Oráculo (FOCO DE DETALLE) <strong>{oracle.oracle_detail_focus.value} ({oracle.oracle_detail_focus.suit})</strong></p>

      <p>Oráculo (FOCO DE TEMA) <strong>{oracle.oracle_topic_focus.value} ({oracle.oracle_topic_focus.suit})</strong></p>

      <p>Complicación de escena <strong>{oracle.scene_complication}</strong></p>

      <p>Escena alterada&nbsp;
        {( oracle.altered_scene && oracle.altered_scene.altered_scene ? <><br /><strong>{oracle.altered_scene.altered_scene}</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.scene_complication ? <><br /><strong>{oracle.altered_scene.scene_complication}</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.pacing_moves ? <><br /><strong>{oracle.altered_scene.pacing_moves.pacing_moves}</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.pacing_moves.random_event ? <><br />¿Qué ocurre? <strong>{oracle.altered_scene.pacing_moves.random_event.what_happens.value} ({oracle.altered_scene.pacing_moves.random_event.what_happens.suit})</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.pacing_moves.random_event ? <><br />Implicando a <strong>{oracle.altered_scene.pacing_moves.random_event.involving.value} ({oracle.altered_scene.pacing_moves.random_event.involving.suit})</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.random_event ? <><br />¿Qué ocurre? <strong>{oracle.altered_scene.random_event.what_happens.value} ({oracle.altered_scene.random_event.what_happens.suit})</strong></> : '' )}
        {( oracle.altered_scene && oracle.altered_scene.random_event ? <><br />Implicando a <strong>{oracle.altered_scene.random_event.involving.value} ({oracle.altered_scene.random_event.involving.suit})</strong></> : '' )}
      </p>

      <p>Movimiento de ritmo&nbsp;
        {( oracle.pacing_moves && oracle.pacing_moves.pacing_moves ? <><br /><strong>{oracle.pacing_moves.pacing_moves}</strong></> : '' )}
        {( oracle.pacing_moves && oracle.pacing_moves.random_event ? <><br />¿Qué ocurre? <strong>{oracle.pacing_moves.random_event.what_happens.value} ({oracle.pacing_moves.random_event.what_happens.suit})</strong></> : '' )}
        {( oracle.pacing_moves && oracle.pacing_moves.random_event ? <><br />Implicando a <strong>{oracle.pacing_moves.random_event.involving.value} ({oracle.pacing_moves.random_event.involving.suit})</strong></> : '' )}
      </p>

      <p>Movimiento de fallo&nbsp;
        {( oracle.failure_moves ? <><br /><strong>{oracle.failure_moves}</strong></> : '' )}
      </p>

      <p>Evento aleatorio&nbsp;
        {( oracle.random_event ? <><br />¿Qué ocurre? <strong>{oracle.random_event.what_happens.value} ({oracle.random_event.what_happens.suit})</strong></> : '' )}
        {( oracle.random_event ? <><br />Implicando a <strong>{oracle.random_event.involving.value} ({oracle.random_event.involving.suit})</strong></> : '' )}
      </p>

      <p>Generador genérico&nbsp;
        {( oracle.generic_generator ? <><br />¿Qué hace? <strong>{oracle.generic_generator.what_it_does.value} ({oracle.generic_generator.what_it_does.suit})</strong></> : '' )}
        {( oracle.generic_generator ? <><br />¿Cómo se ve? <strong>{oracle.generic_generator.how_it_looks.value} ({oracle.generic_generator.how_it_looks.suit})</strong></> : '' )}
        {( oracle.generic_generator ? <><br />Importancia <strong>{oracle.generic_generator.how_significant}</strong></> : '' )}
      </p>

      <p>Generador de tramas&nbsp;
        {( oracle.plot_hook_generator ? <><br />Objetivo <strong>{oracle.plot_hook_generator.objective}</strong></> : '' )}
        {( oracle.plot_hook_generator ? <><br />Adversarios <strong>{oracle.plot_hook_generator.adversaries}</strong></> : '' )}
        {( oracle.plot_hook_generator ? <><br />Recompensas <strong>{oracle.plot_hook_generator.rewards}</strong></> : '' )}
      </p>

      <p>PNJ&nbsp;
        {( oracle.npc_identity ? <><br />Identidad <strong>{oracle.npc_identity.value} ({oracle.npc_identity.suit})</strong></> : '' )}
        {( oracle.npc_goal ? <><br />Intención <strong>{oracle.npc_goal.value} ({oracle.npc_goal.suit})</strong></> : '' )}
        {( oracle.npc_notable_feature ? <><br />Característica notable <strong>{oracle.npc_notable_feature.npc_notable_feature}</strong></> : '' )}
        {( oracle.npc_notable_feature ? <><br />Detalle característica<strong>{oracle.npc_notable_feature.detail_focus.value} ({oracle.npc_notable_feature.detail_focus.suit})</strong></> : '' )}
        {( oracle.npc_current_situation ? <><br />Actitud frente a los PJs <strong>{oracle.npc_current_situation.attitude_to_pcs}</strong></> : '' )}
        {( oracle.npc_current_situation ? <><br />Conversación <strong>{oracle.npc_current_situation.conversation.value} ({oracle.npc_current_situation.conversation.suit})</strong></> : '' )}
      </p>

      <p>Dungeon&nbsp;
        {( oracle.dungeon_theme ? <><br />¿Cómo se ve? <strong>{oracle.dungeon_theme.how_it_looks.value} ({oracle.dungeon_theme.how_it_looks.suit})</strong></> : '' )}
        {( oracle.dungeon_theme ? <><br />¿Para qué es usado? <strong>{oracle.dungeon_theme.how_it_is_used.value} ({oracle.dungeon_theme.how_it_is_used.suit})</strong></> : '' )}
        {( oracle.dungeon_location ? <><br />Lugar <strong>{oracle.dungeon_location}</strong></> : '' )}
        {( oracle.dungeon_encounter ? <><br />Encuentro <strong>{oracle.dungeon_encounter}</strong></> : '' )}
        {( oracle.dungeon_object ? <><br />Objeto <strong>{oracle.dungeon_object}</strong></> : '' )}
        {( oracle.dungeon_total_exits ? <><br />Salidas totales <strong>{oracle.dungeon_total_exits}</strong></> : '' )}
      </p>

      <p>Generador de hexágonos&nbsp;
        {( oracle.hex_terrain ? <><br />Terreno <strong>{oracle.hex_terrain}</strong></> : '' )}
        {( oracle.hex_contents ? <><br />Contenido <strong>{oracle.hex_contents.hex_contents}</strong></> : '' )}
        {( oracle.hex_contents ? <>. <strong>{oracle.hex_contents.hex_features}</strong></> : '' )}
        {( oracle.hex_event ? <><br />Evento <strong>{oracle.hex_event.hex_event}</strong></> : '' )}
        {( oracle.hex_event.random_event ? <><br />¿Qué ocurre? <strong>{oracle.hex_event.random_event.what_happens.value} ({oracle.hex_event.random_event.what_happens.suit})</strong></> : '' )}
        {( oracle.hex_event.random_event ? <><br />Implicando a <strong>{oracle.hex_event.random_event.involving.value} ({oracle.hex_event.random_event.involving.suit})</strong></> : '' )}
      </p>


    </>
  );
}

export default App;
