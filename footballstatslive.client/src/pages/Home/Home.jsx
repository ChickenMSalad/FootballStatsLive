import React, { useContext, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SearchBar from "../../components/SearchBar/SearchBar";
import './Home.css'
import { StatsContext } from '../../context/StatsContext'
import { Link } from 'react-router-dom'

const Home = () => {

const { stats, setStats, columns } = useContext(StatsContext);

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

useEffect(()=>{
  // 
}, [stats])

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
    <div className='home'>
      <div className="hero">
        <h1>College Football Stats Live</h1>
        <p>Please search our live college football stats.</p>
              {contents}
      </div>
    </div>
  )
}

export default Home
