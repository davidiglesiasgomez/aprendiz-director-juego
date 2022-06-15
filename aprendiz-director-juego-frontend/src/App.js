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

  console.log('oracle', oracle)

  if (oracle === null) {
    return <><h1>One Page Solo Engine</h1>Loading...</>
  }

  return (
    <>
      <h1>One Page Solo Engine</h1>

      <table>
      <tbody>
        <tr>
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
        </tr>
        <tr>
            <td>{oracle.d4}</td>
            <td>{oracle.d6}</td>
            <td>{oracle.d8}</td>
            <td>{oracle.d10}</td>
            <td>{oracle.d12}</td>
            <td>{oracle.d20}</td>
            <td>{oracle.d100}</td>
            <td>{oracle.card}</td>
            <td>{oracle.rune.rune} {oracle.rune.label}</td>
            <td>{oracle.direction.direction}</td>
        </tr>
      </tbody>
      </table>

      <strong>Oráculo (SÍ/NO)</strong>
      <table>
        <tbody>
        <tr>
            <th>Probable</th><td>{oracle.oracle_yes_no_likely}</td>
        </tr>
        <tr>
            <th>Igualado</th><td>{oracle.oracle_yes_no_even}</td>
        </tr>
        <tr>
            <th>Improbable</th><td>{oracle.oracle_yes_no_unlikely}</td>
        </tr>
        </tbody>
      </table>

      <strong>Oráculo (CÓMO)</strong>
      <p>{oracle.oracle_how}</p>

      <strong>Oráculo (FOCO DE ACCIÓN)</strong>
      <p>{oracle.oracle_action_focus.value}. {oracle.oracle_action_focus.suit}</p>

      <strong>Oráculo (FOCO DE DETALLE)</strong>
      <p>{oracle.oracle_detail_focus.value}. {oracle.oracle_detail_focus.suit}</p>

      <strong>Oráculo (FOCO DE TEMA)</strong>
      <p>{oracle.oracle_topic_focus.value}. {oracle.oracle_topic_focus.suit}</p>

    </>
  );
}

export default App;
