using FootballStatsLive.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FootballStatsLive.Server.DataAccessLayer
{
    public class FootballStatDataAccessLayer
    {
        StatsDatabaseContext db = new StatsDatabaseContext();

        public IEnumerable<TblFootballStat> GetAllStats()
        {
            try
            {
                return db.TblFootballStats.ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
