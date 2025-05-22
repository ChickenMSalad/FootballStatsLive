using System;
using System.Collections.Generic;

namespace FootballStatsLive.Server.Models;

/// <summary>
/// Represents a record of football team statistics.
/// </summary>
public partial class TblFootballStat
{
    /// <summary>
    /// Unique identifier for the football stat record.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// The team's current rank. Nullable in case rank is not available.
    /// </summary>
    public int? Rank { get; set; }

    /// <summary>
    /// The name of the football team. Nullable if data is not available.
    /// </summary>
    public string? Team { get; set; }

    /// <summary>
    /// The mascot of the football team. Nullable if data is not available.
    /// </summary>
    public string? Mascot { get; set; }

    /// <summary>
    /// The date when the team last won a game. Stored as a string (it is Date Only).
    /// </summary>
    public string? DateOfLastWin { get; set; }

    /// <summary>
    /// The team's winning percentage. Nullable if data is not available.
    /// </summary>
    public double? WinningPercentage { get; set; }

    /// <summary>
    /// The number of games won by the team. Nullable if data is not available.
    /// </summary>
    public int? Wins { get; set; }

    /// <summary>
    /// The number of games lost by the team. Nullable if data is not available.
    /// </summary>
    public int? Losses { get; set; }

    /// <summary>
    /// The number of games that ended in a tie. Nullable if data is not available.
    /// </summary>
    public int? Ties { get; set; }

    /// <summary>
    /// The total number of games played. Nullable if data is not available.
    /// </summary>
    public int? Games { get; set; }
}
