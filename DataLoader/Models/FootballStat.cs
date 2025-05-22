using CsvHelper.Configuration;

namespace FootballStatsLive.Server.Models
{
    /// <summary>
    /// Represents a football team’s statistical record.
    /// Properties validate raw CSV string inputs, ensuring only valid data is set.
    /// </summary>
    public class FootballStat
    {
        public int? Rank { get; set; }  // Nullable rank of the team

        public string? Team { get; set; }  // Team name, nullable

        public string? Mascot { get; set; }  // Team mascot, nullable

        // Backing field for DateOfLastWin property
        private string? _dateOfLastWin;

        /// <summary>
        /// Date of last win as a string.
        /// Setter attempts to parse the value as a DateOnly.
        /// If valid, stores the value; otherwise ignores invalid input.
        /// </summary>
        public string? DateOfLastWin
        {
            get { return _dateOfLastWin; }
            set
            {
                if (DateOnly.TryParse(value, out DateOnly result))
                {
                    _dateOfLastWin = value; // only set if valid date string
                }
            }
        }

        private string? _winningPercentage;

        /// <summary>
        /// Winning percentage as a string.
        /// Setter tries to parse as double; sets value only if valid.
        /// </summary>
        public string? WinningPercentage
        {
            get { return _winningPercentage; }
            set
            {
                if (double.TryParse(value, out double result))
                {
                    if (result < 1) 
                        _winningPercentage = value; // set only if valid double and is less than 1
                }
            }
        }

        private string? _wins;

        /// <summary>
        /// Wins count as string.
        /// Setter validates that value parses to int before setting.
        /// </summary>
        public string? Wins
        {
            get { return _wins; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _wins = value;
                }
            }
        }

        private string? _losses;

        /// <summary>
        /// Losses count as string.
        /// Setter validates int conversion before assignment.
        /// </summary>
        public string? Losses
        {
            get { return _losses; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _losses = value;
                }
            }
        }

        private string? _ties;

        /// <summary>
        /// Ties count as string.
        /// Setter validates int conversion before assignment.
        /// </summary>
        public string? Ties
        {
            get { return _ties; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _ties = value;
                }
            }
        }

        private string? _games;

        /// <summary>
        /// Games played as string.
        /// Setter validates int conversion before assignment.
        /// </summary>
        public string? Games
        {
            get { return _games; }
            set
            {
                if (int.TryParse(value, out int result))
                {
                    _games = value;
                }
            }
        }
    }

    /// <summary>
    /// CsvHelper mapping class for FootballStat.
    /// Maps CSV column names (including ones with spaces or typos) to class properties.
    /// </summary>
    public class FootballStatClassMap : ClassMap<FootballStat>
    {
        public FootballStatClassMap()
        {
            Map(m => m.Rank).Name("Rank");
            Map(m => m.Team).Name("Team");
            Map(m => m.Mascot).Name("Mascot");
            Map(m => m.DateOfLastWin).Name("Date of Last Win"); // Handles spaces in header name
            Map(m => m.WinningPercentage).Name("Winning Percetnage");  // Maps despite spelling error in CSV header
            Map(m => m.Wins).Name("Wins");
            Map(m => m.Losses).Name("Losses");
            Map(m => m.Ties).Name("Ties");
            Map(m => m.Games).Name("Games");
        }
    }
}
