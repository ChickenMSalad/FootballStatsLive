import React, { useContext, useEffect, useState } from 'react'
import './About.css'

const About = () => {

    return (
        <div className='about'>
            <div className="about-name">
                <p className='title'><b>About this project</b></p>
                <p>This Developer code project is a Full Stack React and .NET Core application.</p>
                <p>It implements a locally stored SQLite Database and uses the Entity Framework to serve up the data.</p>
            </div>

            <div className="about-info">
                <ul>
                    <li>Developed By</li>
                    <li>Dean Taylor</li>
                </ul>
                <ul>
                    <li>GitHub</li>
                    <li><a href="https://github.com/ChickenMSalad/FootballStatsLive" target="_blank">https://github.com/ChickenMSalad/FootballStatsLive</a></li>
                </ul>
                <ul>
                    <li>Live Deployment</li>
                    <li><a href="https://footballstatsliveserver20250520012711-fbh3andmc0hqadg3.eastus-01.azurewebsites.net/" target="_blank">footballstatsliveserver</a></li>
                </ul>
            </div>

        </div>
    )

}

export default About
