import { createContext, useEffect, useState } from "react";

// Create a new context for football stats
export const StatsContext = createContext();

const StatsContextProvider = (props) => {

    // State to hold football statistics data
    const [stats, setStats] = useState();

    // Function to check if the backend server is up and responding
    const checkServerStatus = async () => {
        try {
            const response = await fetch('/footballstats');
            if (response.ok) {
                return true; // Server is up
            }
        } catch (error) {
            console.error('Error checking server status:', error);
        }
        return false; // Server is down or unreachable
    };

    // Function that waits until the server is ready before populating data
    const waitForServer = async () => {
        while (!(await checkServerStatus())) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Retry every second
        }
        // Once the server is ready, fetch the stats data
        populateFootballStatsData();
    };

    // Fetch football statistics from the server and update state
    async function populateFootballStatsData() {
        const response = await fetch('/footballstats/index');
        if (response.ok) {
            const data = await response.json();
            setStats(data); // Set the fetched data to state
        }
    }

    // React effect that runs on component mount
    useEffect(() => {
        if (stats === undefined) {
            // In development, wait for the server to be available
            if (process.env.NODE_ENV === "development") {
                waitForServer();
            } else {
                // In production, fetch data directly
                populateFootballStatsData();
            }
        }
    }, []);

    // Table column definitions for displaying football stats
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
            // Custom cell rendering with class name based on team name
            cell: row => <div data-tag="allowRowEvents" className={'team ' + row.team.replace(/[^0-9a-zA-Z]/g, '')}>{row.team}</div>
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
            // Highlight cells with missing data
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

    // Context value that will be available to child components
    const contextValue = {
        stats, setStats, columns
    }

    // Return the context provider wrapping child components
    return (
        <StatsContext.Provider value={contextValue}>
            {props.children}
        </StatsContext.Provider>
    )
}

export default StatsContextProvider;
