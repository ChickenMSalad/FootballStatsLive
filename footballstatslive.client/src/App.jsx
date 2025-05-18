import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './App.css';

function App() {
    const [stats, setStats] = useState();

    const checkServerStatus = async () => {
        try {
            const response = await fetch('/footballstats');
            if (response.ok) {
                console.log('Response OK!!!');
                return true;
            }
        } catch (error) {
            console.error('Error checking server status:', error);
        }
        console.log('Response NOT OK');
        return false;
    };

    const waitForServer = async () => {
        console.log('Calling waitForServer');
        while (!(await checkServerStatus())) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Check every 1 second
        }
        console.log('Server is ready!');
        populateFootballStatsData();

    };

    if (stats === undefined) {
        if (process.env.NODE_ENV === "development") {
            waitForServer();
        } else {
            useEffect(() => {
                populateFootballStatsData();
            }, []);
        }
    }
    

    const columns = [
        {
            name: 'Rank',
            selector: row => row.rank,
            sortable: true,
        },
        {
            name: 'Team',
            selector: row => row.team,
            sortable: true,
        },
        {
            name: 'Mascot',
            selector: row => row.mascot,
            sortable: true,
        },
        {
            name: 'Date of Last Win',
            selector: row => row.dateOfLastWin,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.dateOfLastWin == null,
                    classNames: ['missingdata'],
                },
            ]
        },
        {
            name: 'Wins',
            selector: row => row.wins,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.wins == null,
                    classNames: ['missingdata'],
                },
            ]
        },
        {
            name: 'Losses',
            selector: row => row.losses,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.losses == null,
                    classNames: ['missingdata'],
                },
            ]
        },
        {
            name: 'Ties',
            selector: row => row.ties,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.ties == null,
                    classNames: ['missingdata'],
                },
            ]
        },
        {
            name: 'Games',
            selector: row => row.games,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.games == null,
                    classNames: ['missingdata'],
                },
            ]
        },
    ];

    const contents = stats === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <DataTable
            columns={columns}
            data={stats}
            pagination
        />;

    return (
        <div>
            <h1 id="tableLabel">Football Stats</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateFootballStatsData() {
        const response = await fetch('/footballstats/index');
        if (response.ok) {
            const data = await response.json();
            setStats(data);
        }
    }
}

export default App;