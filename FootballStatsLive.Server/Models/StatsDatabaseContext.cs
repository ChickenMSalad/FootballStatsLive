using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FootballStatsLive.Server.Models;

/// <summary>
/// Represents the Entity Framework Core database context for accessing football statistics data.
/// </summary>
public partial class StatsDatabaseContext : DbContext
{
    /// <summary>
    /// Default constructor. Useful for design-time tools or manual instantiation.
    /// </summary>
    public StatsDatabaseContext()
    {
    }

    /// <summary>
    /// Constructor that accepts options for configuring the context, used by dependency injection.
    /// </summary>
    /// <param name="options">The options to configure the context.</param>
    public StatsDatabaseContext(DbContextOptions<StatsDatabaseContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Represents the football statistics table in the database.
    /// </summary>
    public virtual DbSet<TblFootballStat> TblFootballStats { get; set; }

    /// <summary>
    /// Configures the database connection if not already configured (used in non-DI scenarios).
    /// </summary>
    /// <param name="optionsBuilder">Options builder for the context.</param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite("Data Source=Data/statsDatabase.db"); // Connects to a SQLite database file.

    /// <summary>
    /// Configures the model schema details, such as table names and column mappings.
    /// </summary>
    /// <param name="modelBuilder">Used to build the EF model for the context.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the mapping for the TblFootballStat entity.
        modelBuilder.Entity<TblFootballStat>(entity =>
        {
            // Set the table name to match the SQLite table
            entity.ToTable("tbl_FootballStats");

            // Prevent automatic value generation for the primary key (manual assignment)
            entity.Property(e => e.Id).ValueGeneratedNever();

            // Set data type mappings for string columns
            entity.Property(e => e.Mascot).HasColumnType("VARCHAR");
            entity.Property(e => e.Team).HasColumnType("VARCHAR");
        });

        // Allow for further partial configuration in another file
        OnModelCreatingPartial(modelBuilder);
    }

    /// <summary>
    /// Partial method to allow additional configuration in a separate partial class file.
    /// </summary>
    /// <param name="modelBuilder">The model builder instance.</param>
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
