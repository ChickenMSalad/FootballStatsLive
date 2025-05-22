using FootballStatsLive.Server.DataAccessLayer;
using FootballStatsLive.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FootballStatsLive.Server.Controllers
{
    /// <summary>
    /// API controller for handling HTTP requests related to football statistics.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class FootballStatsController : ControllerBase
    {
        // Instance of the data access layer to retrieve football statistics.
        FootballStatDataAccessLayer objFootballStat = new FootballStatDataAccessLayer();

        // Logger instance for logging purposes.
        private readonly ILogger<FootballStatsController> _logger;

        /// <summary>
        /// Constructor with dependency injection for the logger.
        /// </summary>
        /// <param name="logger">Logger instance for this controller.</param>
        public FootballStatsController(ILogger<FootballStatsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Basic GET endpoint used to verify the server is running.
        /// </summary>
        /// <returns>HTTP 200 OK response.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        /// <summary>
        /// Retrieves all football statistics from the database.
        /// </summary>
        /// <returns>List of all football statistics.</returns>
        [HttpGet]
        [Route("/[controller]/Index")]
        public IEnumerable<TblFootballStat> GetAllStats()
        {
            return objFootballStat.GetAllStats();
        }

        /// <summary>
        /// Retrieves football statistics filtered by search term and optional column.
        /// </summary>
        /// <param name="searchTerm">Text to search for in the records.</param>
        /// <param name="columnTerm">Specific column to search in. If null or "All", all columns are searched.</param>
        /// <returns>Filtered list of football statistics matching the search criteria.</returns>
        [HttpGet]
        [Route("/[controller]/Search")]
        public IEnumerable<TblFootballStat> GetStatsBySearch(string? searchTerm, string? columnTerm)
        {
            return objFootballStat.GetStatsBySearch(searchTerm, columnTerm);
        }
    }
}
