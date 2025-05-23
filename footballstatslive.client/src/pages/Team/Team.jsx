import React, { useContext, useEffect, useState } from 'react'
import './Team.css'
import { StatsContext } from '../../context/StatsContext'
import { useParams } from 'react-router-dom'


const Team = () => {

  const {teamId} = useParams();
  const {stats} = useContext(StatsContext);
  const [teamData, setTeamData] = useState();

  useEffect(() => {
      if (stats !== undefined) {
          var result = stats.find(obj => obj.id == teamId);
          setTeamData(result);
      }

  },[stats])

    if (teamData) {
        return (
            <div className='teamdata'>
                <div className="teamdata-name">
                    <div className={'teamlg ' + teamData.team.replace(/[^0-9a-zA-Z]/g, '') + 'LG'}></div>
                    <p><b>{teamData.team}</b></p>
                </div>

                <div className="teamdata-info">
                    <ul>
                        <li>Rank</li>
                        <li>{teamData.rank}</li>
                    </ul>
                    <ul>
                        <li>Mascot</li>
                        <li>{teamData.mascot}</li>
                    </ul>
                    <ul>
                        <li>Date of Last Win</li>
                        <li>{teamData.dateOfLastWin}</li>
                    </ul>
                    <ul>
                        <li>Winning Percentage</li>
                        <li>{teamData.winningPercentage}</li>
                    </ul>
                    <ul>
                        <li>Wins</li>
                        <li>{teamData.wins}</li>
                    </ul>
                    <ul>
                        <li>Losses</li>
                        <li>{teamData.losses}</li>
                    </ul>
                    <ul>
                        <li>Ties</li>
                        <li>{teamData.ties}</li>
                    </ul>
                    <ul>
                        <li>Games</li>
                        <li>{teamData.games}</li>
                    </ul>
                </div>

            </div>
        )
    } else {
        return (
            <div className='spinner'>
                <div className="spin"></div>
            </div>
        )
    }

  
}

export default Team
