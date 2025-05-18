using System;
using System.Collections.Generic;

namespace FootballStatsLive.Server.Models;

public partial class TblFootballStat
{
    public int Id { get; set; }

    public int? Rank { get; set; }

    public string? Team { get; set; }

    public string? Mascot { get; set; }

    public string? DateOfLastWin { get; set; }

    public double? WinningPercentage { get; set; }

    public int? Wins { get; set; }

    public int? Losses { get; set; }

    public int? Ties { get; set; }

    public int? Games { get; set; }
}
