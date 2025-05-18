
using CsvHelper.Configuration;

namespace FootballStatsLive.Server.Models
{
    public class FootballStat
    {
        public int? Rank { get; set; }

        public string? Team { get; set; }

        public string? Mascot { get; set; }

        private string? _dateOfLastWin;
        public string? DateOfLastWin
        {
            get { return _dateOfLastWin; }
            set
            {
                if (DateOnly.TryParse(value, out DateOnly result))
                {
                    _dateOfLastWin = value; // return valid data, otherwise nullable
                }
            }
        }

        private string? _winningPercentage;
        public string? WinningPercentage
        {
            get { return _winningPercentage; }
            set
            {
                if (double.TryParse(value, out double result))
                {
                    _winningPercentage = value; // return valid data, otherwise nullable
                }
            }
        }

        private string? _wins;
        public string? Wins
        {
            get { return _wins; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _wins = value; // return valid data, otherwise nullable
                }
            }
        }

        private string? _losses;
        public string? Losses
        {
            get { return _losses; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _losses = value; // return valid data, otherwise nullable
                }
            }
        }
        private string? _ties;
        public string? Ties
        {
            get { return _ties; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _ties = value; // return valid data, otherwise nullable
                }
            }
        }

        private string? _games;
        public string? Games
        {
            get { return _games; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _games = value; // return valid data, otherwise nullable
                }
            }
        }

    }
    public class FootballStatClassMap : ClassMap<FootballStat>
    {
        public FootballStatClassMap()
        {
            Map(m => m.Rank).Name("Rank");
            Map(m => m.Team).Name("Team");
            Map(m => m.Mascot).Name("Mascot");
            Map(m => m.DateOfLastWin).Name("Date of Last Win"); // spaces in header
            Map(m => m.WinningPercentage).Name("Winning Percetnage");  // spelling error on header + spaces
            Map(m => m.Wins).Name("Wins");
            Map(m => m.Losses).Name("Losses");
            Map(m => m.Ties).Name("Ties");
            Map(m => m.Games).Name("Games");

        }
    }
}


