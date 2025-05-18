import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [stats, setStats] = useState();

    useEffect(() => {
        populateFootballStatsData();
    }, []);

    const contents = stats === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Mascot</th>
                    <th>Date of Last Win</th>
                    <th>Winning Percentage</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Ties</th>
                    <th>Games</th>
                </tr>
            </thead>
            <tbody>
                {stats.map(footballstat =>
                    <tr key={footballstat.id}>
                        <td>{footballstat.rank}</td>
                        <td>{footballstat.team}</td>
                        <td>{footballstat.mascot}</td>
                        <td>{footballstat.dateOfLastWin}</td>
                        <td>{footballstat.winningPercentage}</td>
                        <td>{footballstat.wins}</td>
                        <td>{footballstat.losses}</td>
                        <td>{footballstat.ties}</td>
                        <td>{footballstat.games}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Football Stats</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateFootballStatsData() {
        const response = await fetch('/footballstats');
        if (response.ok) {
            const data = await response.json();
            setStats(data);
        }
    }
}

export default App;