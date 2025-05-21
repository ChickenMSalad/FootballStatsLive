import { createContext, useEffect, useState } from "react";

export const StatsContext = createContext();

const StatsContextProvider = (props) => {

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

    async function populateFootballStatsData() {
        const response = await fetch('/footballstats/index');
        if (response.ok) {
            const data = await response.json();
            setStats(data);
        }
    }

    useEffect(() => {
        if (stats === undefined) {
            if (process.env.NODE_ENV === "development") {
                waitForServer();
            } else {
                populateFootballStatsData();

            }
        }
    }, []);

    const columns = [
        {
            name: 'Rank',
            selector: row => row.rank,
            sortable: true,
            width: '75px',
        },
        {
            name: 'Team',
            selector: row => row.team,
            sortable: true,
            width: '200px',
            cell: row => <div className={'team ' + row.team.replace(/[^0-9a-zA-Z]/g, '')}>{row.team}</div>
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

    const contextValue = {
        stats, setStats, columns
    }

    return (
        <StatsContext.Provider value={contextValue}>
            {props.children}
        </StatsContext.Provider>
    )
}

export default StatsContextProvider;