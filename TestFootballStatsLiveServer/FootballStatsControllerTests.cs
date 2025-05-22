using FootballStatsLive.Server.Controllers;
using FootballStatsLive.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System.Collections.Generic;

namespace TestFootballStatsLiveServer
{
    public class FootballStatsControllerTests
    {
        [Fact]
        public void Get_Returns_OkResult()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.Get();

            // Assert
            Assert.IsType<OkResult>(result);

        }

        [Fact]
        public void GetAllStats_Returns_AllStats()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.GetAllStats();

            // Assert
            Assert.IsType<List<TblFootballStat>>(result);

        }

        [Fact]
        public void SearchStatsBySearchTerm_Returns_Stats_FromAllCols()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.GetStatsBySearch("bob", ""); //bobcats
            ;
            // Assert
            Assert.True(result.Count() > 0);  // returns 1 for bobcats
            

        }

        [Fact]
        public void SearchStatsBySearchTerm_Returns_NoStats_FromACol()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.GetStatsBySearch("bob", "Rank"); 
            ;
            // Assert
            Assert.True(result.Count() == 0);  // returns 0 because no bob in Rank


        }

        [Fact]
        public void SearchStatsBySearchTerm_Returns_Stats_FromACol()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.GetStatsBySearch("1", "Rank");
            ;
            // Assert
            Assert.True(result.Count() > 0);  // returns > 0 because there is a 1 in Rank

        }

        [Fact]
        public void SearchStatsBySearchTerm_Returns_AllStats_FromNoCol()
        {
            // Arrange
            var mock = new Mock<ILogger<FootballStatsController>>();
            ILogger<FootballStatsController> logger = mock.Object;
            var controller = new FootballStatsController(logger);

            // Act
            var result = controller.GetStatsBySearch("1", "");
            ;
            // Assert
            Assert.True(result.Count() > 0);  // returns > 0 because there is a 1 in many columns

        }
    }
}