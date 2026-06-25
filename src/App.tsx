import { useMemo, useState } from 'react'
import './App.css'

type GameLocation = 'Home' | 'Away' | 'Neutral'

interface Game {
  id: number
  opponent: string
  soonersPoints: number
  opponentPoints: number
  location: GameLocation
}

const SEED_GAMES: Game[] = [
  { id: 1, opponent: 'Temple', soonersPoints: 51, opponentPoints: 3, location: 'Home' },
  { id: 2, opponent: 'Houston', soonersPoints: 16, opponentPoints: 12, location: 'Home' },
  { id: 3, opponent: 'Auburn', soonersPoints: 24, opponentPoints: 17, location: 'Away' },
  { id: 4, opponent: 'Texas', soonersPoints: 23, opponentPoints: 6, location: 'Neutral' },
]

function App() {
  const [games, setGames] = useState<Game[]>(SEED_GAMES)
  const [opponent, setOpponent] = useState('')
  const [soonersPoints, setSoonersPoints] = useState('')
  const [opponentPoints, setOpponentPoints] = useState('')
  const [location, setLocation] = useState<GameLocation>('Home')

  const analytics = useMemo(() => {
    const totalGames = games.length
    const wins = games.filter((g) => g.soonersPoints > g.opponentPoints).length
    const losses = totalGames - wins
    const pointsFor = games.reduce((sum, g) => sum + g.soonersPoints, 0)
    const pointsAgainst = games.reduce((sum, g) => sum + g.opponentPoints, 0)
    const winPct = totalGames === 0 ? 0 : Math.round((wins / totalGames) * 1000) / 10
    const avgFor = totalGames === 0 ? 0 : Math.round((pointsFor / totalGames) * 10) / 10
    const avgAgainst = totalGames === 0 ? 0 : Math.round((pointsAgainst / totalGames) * 10) / 10
    const avgMargin = Math.round((avgFor - avgAgainst) * 10) / 10
    return { totalGames, wins, losses, winPct, avgFor, avgAgainst, avgMargin }
  }, [games])

  const canSubmit =
    opponent.trim() !== '' && soonersPoints.trim() !== '' && opponentPoints.trim() !== ''

  function addGame(event: React.FormEvent) {
    event.preventDefault()
    if (!canSubmit) return
    setGames((prev) => [
      ...prev,
      {
        id: prev.length === 0 ? 1 : Math.max(...prev.map((g) => g.id)) + 1,
        opponent: opponent.trim(),
        soonersPoints: Number(soonersPoints),
        opponentPoints: Number(opponentPoints),
        location,
      },
    ])
    setOpponent('')
    setSoonersPoints('')
    setOpponentPoints('')
    setLocation('Home')
  }

  return (
    <div className="app">
      <header className="masthead">
        <span className="logo" aria-hidden="true">
          OU
        </span>
        <div>
          <h1>BoomerBall</h1>
          <p>Oklahoma Sooners Football Analytics</p>
        </div>
      </header>

      <main>
        <section className="stat-grid" aria-label="Season analytics">
          <div className="stat-card">
            <span className="stat-label">Record</span>
            <span className="stat-value">
              {analytics.wins}–{analytics.losses}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Win %</span>
            <span className="stat-value">{analytics.winPct}%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Points For</span>
            <span className="stat-value">{analytics.avgFor}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Points Against</span>
            <span className="stat-value">{analytics.avgAgainst}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Margin</span>
            <span className={`stat-value ${analytics.avgMargin >= 0 ? 'positive' : 'negative'}`}>
              {analytics.avgMargin > 0 ? '+' : ''}
              {analytics.avgMargin}
            </span>
          </div>
        </section>

        <section className="panel">
          <h2>Add a Game</h2>
          <form className="game-form" onSubmit={addGame}>
            <label>
              Opponent
              <input
                type="text"
                value={opponent}
                placeholder="e.g. Texas Tech"
                onChange={(e) => setOpponent(e.target.value)}
              />
            </label>
            <label>
              Sooners Points
              <input
                type="number"
                min="0"
                value={soonersPoints}
                placeholder="0"
                onChange={(e) => setSoonersPoints(e.target.value)}
              />
            </label>
            <label>
              Opponent Points
              <input
                type="number"
                min="0"
                value={opponentPoints}
                placeholder="0"
                onChange={(e) => setOpponentPoints(e.target.value)}
              />
            </label>
            <label>
              Location
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as GameLocation)}
              >
                <option value="Home">Home</option>
                <option value="Away">Away</option>
                <option value="Neutral">Neutral</option>
              </select>
            </label>
            <button type="submit" disabled={!canSubmit}>
              Add Game
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Game Log</h2>
          <table className="game-table">
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Location</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                const win = game.soonersPoints > game.opponentPoints
                return (
                  <tr key={game.id}>
                    <td>{game.opponent}</td>
                    <td>{game.location}</td>
                    <td>
                      {game.soonersPoints}–{game.opponentPoints}
                    </td>
                    <td className={win ? 'positive' : 'negative'}>{win ? 'W' : 'L'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="footer">Boomer Sooner! · {analytics.totalGames} games tracked</footer>
    </div>
  )
}

export default App
