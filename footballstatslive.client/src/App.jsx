import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';
import SearchBar from "./components/SearchBar";

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
            name: 'Winning Percentage',
            selector: row => row.winningPercentage,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.winningPercentage == null,
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
        ? <div><p><em>Loading Football Stats...</em></p><Skeleton count={10} /></div>
        : <div>
            <SearchBar onSearch={onSearch} onReset={onReset} cols={columns} />
            <DataTable
             columns={columns}
             data={stats}
             pagination
             dense
            />
            <p className="error">An asterisk * denotes missing, bad or unsearchable data.</p>
          </div>

    return (
        <div>
            <h1 id="tableLabel">Football Stats Live</h1>
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

    async function populateFootballStatsSearch(searchTerm, columnTerm) {
        const response = await fetch(`/footballstats/search?searchTerm=${searchTerm}&columnTerm=${columnTerm}`);
        if (response.ok) {
            const data = await response.json();
            setStats(data);
        }
    }

    function onSearch(searchObj) {
        populateFootballStatsSearch(searchObj.searchTerm, searchObj.columnTerm); 
    }
    function onReset() {
        populateFootballStatsData();
    }
}

export default App;