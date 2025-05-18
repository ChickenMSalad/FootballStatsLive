
using FootballStatsLive.Server.DataAccessLayer;
using FootballStatsLive.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace FootballStatsLive.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FootballStatsController : ControllerBase
    {
        FootballStatDataAccessLayer objFootballStat = new FootballStatDataAccessLayer();


        private readonly ILogger<FootballStatsController> _logger;

        public FootballStatsController(ILogger<FootballStatsController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public IActionResult Get()
        {
            // used to check if server is up
            return Ok();
        }

        [HttpGet]
        [Route("/[controller]/Index")]
        public IEnumerable<TblFootballStat> GetAllStats()
        {
            return objFootballStat.GetAllStats();
        }


    }
}
