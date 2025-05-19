using FootballStatsLive.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace FootballStatsLive.Server.DataAccessLayer
{
    /// <summary>
    /// Data access layer for handling operations related to football statistics.
    /// </summary>
    public class FootballStatDataAccessLayer
    {
        // Database context to interact with the Stats database
        StatsDatabaseContext db = new StatsDatabaseContext();

        /// <summary>
        /// Retrieves all football statistics from the database.
        /// </summary>
        /// <returns>A list of all football stat records.</returns>
        public IEnumerable<TblFootballStat> GetAllStats()
        {
            try
            {
                return db.TblFootballStats.ToList();
            }
            catch
            {
                // Propagate exception to the caller
                throw;
            }
        }

        /// <summary>
        /// Retrieves football statistics based on a search term and optional column filter.
        /// </summary>
        /// <param name="searchTerm">The term to search for in the data.</param>
        /// <param name="columnTerm">The specific column to search in. If 'All' or null, searches all columns.</param>
        /// <returns>A filtered list of football stat records that match the search criteria.</returns>
        public IEnumerable<TblFootballStat> GetStatsBySearch(string searchTerm, string columnTerm)
        {
            try
            {
                // Get the complete list of stats
                List<TblFootballStat> fullStats = db.TblFootballStats.ToList();

                // If no search term is provided, return the full list
                if (string.IsNullOrEmpty(searchTerm))
                {
                    return fullStats;
                }

                // Get type info and all properties of the TblFootballStat class
                var type = fullStats.GetType().GetGenericArguments()[0];
                var allProperties = type.GetProperties();
                List<PropertyInfo> properties = allProperties.ToList();

                // If a specific column is provided and it's not "All", filter to just that property
                if (!string.IsNullOrEmpty(columnTerm) && !columnTerm.Equals("All", StringComparison.OrdinalIgnoreCase))
                {
                    properties = allProperties
                        .Where(p => p.Name.Equals(columnTerm, StringComparison.OrdinalIgnoreCase))
                        .ToList();

                    // If column doesn't exist, fall back to searching all properties
                    if (properties.Count == 0)
                    {
                        properties = allProperties.ToList();
                    }
                }

                // Filter the stats by checking if the search term appears in any of the selected properties
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
                // Propagate exception to the caller
                throw;
            }
        }
    }
}
