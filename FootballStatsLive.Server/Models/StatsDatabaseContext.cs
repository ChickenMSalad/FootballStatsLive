using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FootballStatsLive.Server.Models;

public partial class StatsDatabaseContext : DbContext
{
    public StatsDatabaseContext()
    {
    }

    public StatsDatabaseContext(DbContextOptions<StatsDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblFootballStat> TblFootballStats { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite("Data Source=Data/statsDatabase.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblFootballStat>(entity =>
        {
            entity.ToTable("tbl_FootballStats");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Mascot).HasColumnType("VARCHAR");
            entity.Property(e => e.Team).HasColumnType("VARCHAR");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
