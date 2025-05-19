using FootballStatsLive.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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

        public IEnumerable<TblFootballStat> GetStatsBySearch(string searchTerm, string columnTerm)
        {
            try
            {
                List<TblFootballStat> fullStats = db.TblFootballStats.ToList();

                if (string.IsNullOrEmpty(searchTerm))
                {
                    return fullStats;
                }

                var type = fullStats.GetType().GetGenericArguments()[0];
                var allProperties = type.GetProperties();
                List<PropertyInfo> properties = new List<PropertyInfo>();
                properties = allProperties.ToList();
                if (!string.IsNullOrEmpty(columnTerm) && !columnTerm.Equals("All"))
                {
                    properties = allProperties.Where(p => p.Name.ToLower() == columnTerm.ToLower()).ToList();
                    if (properties.Count == 0)
                    {
                        properties = allProperties.ToList();
                    }
                }

                var result = fullStats.Where(x => properties
                            .Any(p =>
                            {
                                var value = p.GetValue(x);
                                var testValue = value != null ? value.ToString() : string.Empty;
                                return testValue.ToLower().Contains(searchTerm.ToLower());
                            }));

                return result;


            }
            catch
            {
                throw;
            }
        }
    }
}
