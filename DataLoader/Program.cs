using CsvHelper;
using System.Globalization;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Logging;
using CsvHelper.Configuration;
using System.Reflection.PortableExecutable;
using FootballStatsLive.Server.Models;
using System.Reflection;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Xml.Linq;

namespace DataLoader
{
    /// <summary>
    /// Main entry point for the data loading utility. This program loads football statistics
    /// from a CSV file into a SQLite database.
    /// </summary>
    class Program
    {
        /// <summary>
        /// Entry point of the console application.
        /// Displays the menu and waits for user input.
        /// </summary>
        private static void Main()
        {
            DisplayMenu();
            var result = Console.ReadLine();
            Action(result);
        }

        /// <summary>
        /// Displays the main menu options in the console.
        /// </summary>
        public static void DisplayMenu()
        {
            Console.Clear();
            Console.WriteLine("1. Create Database");
            Console.WriteLine("Press ESC to stop");
            Console.WriteLine("Select an option: ");
        }

        /// <summary>
        /// Executes an action based on the user's menu choice.
        /// </summary>
        /// <param name="option">User input representing the menu option.</param>
        public static void Action(string option)
        {
            switch (option)
            {
                case "1":
                    CreateDatabase();
                    break;
            }

            Console.WriteLine("Action ended.");
            Console.WriteLine("Press Escape to end...");

            // Wait for the user to press Escape
            ConsoleKeyInfo key = new ConsoleKeyInfo();
            while (!Console.KeyAvailable && key.Key != ConsoleKey.Escape)
            {
                key = Console.ReadKey(true);
            }
        }

        /// <summary>
        /// Creates the SQLite database, loads data from CSV, and inserts it into the database.
        /// </summary>
        public static void CreateDatabase()
        {
            string myTableName = "tbl_FootballStats";

            using (var connection = new SqliteConnection("Data Source=statsDatabase.db"))
            {
                connection.Open();

                // Drop existing table and create a new one
                DropTableIfExists(connection, myTableName);
                CreateTable(connection, myTableName);

                // Handle malformed records
                bool isRecordBad = false;
                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    BadDataFound = args =>
                    {
                        Console.WriteLine($"field: {args.Field}");
                        Console.WriteLine($"context: {args.Context}");
                        Console.WriteLine($"bad record: {args.RawRecord}");
                        isRecordBad = true;
                    },
                };

                // Read the CSV file and populate the database
                using (var reader = new StreamReader("Data/CollegeFootballTeamWinsWithMascots.csv"))
                using (var csv = new CsvReader(reader, config))
                {
                    csv.Context.RegisterClassMap<FootballStatClassMap>();

                    csv.Read();
                    csv.ReadHeader();

                    while (csv.Read())
                    {
                        isRecordBad = false;

                        try
                        {
                            var record = csv.GetRecord<FootballStat>();
                            if (!isRecordBad)
                            {
                                PopulateTable(connection, myTableName, record);
                            }
                        }
                        catch (CsvHelper.TypeConversion.TypeConverterException e)
                        {
                            Console.WriteLine($"TypeConverterException {e.Text}");
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Drops the table if it exists to ensure a clean slate.
        /// </summary>
        private static void DropTableIfExists(SqliteConnection conn, string tableName)
        {
            if (conn.State == System.Data.ConnectionState.Closed)
                conn.Open();

            string dropTableSql = $"DROP TABLE IF EXISTS {tableName};";
            SqliteCommand command = new SqliteCommand(dropTableSql, conn);
            command.ExecuteNonQuery();
        }

        /// <summary>
        /// Creates a new table in the database with the specified schema.
        /// </summary>
        private static void CreateTable(SqliteConnection conn, string tableName)
        {
            if (conn.State == System.Data.ConnectionState.Closed)
                conn.Open();

            string createTableSql = $@"CREATE TABLE IF NOT EXISTS {tableName}(Id INTEGER PRIMARY KEY, 
                                     Rank INTEGER,  
                                     Team VARCHAR,
                                     Mascot VARCHAR,
                                     DateOfLastWin TEXT,
                                     WinningPercentage REAL,
                                     Wins INTEGER,
                                     Losses INTEGER,
                                     Ties INTEGER,
                                     Games INTEGER)";

            SqliteCommand command = new SqliteCommand(createTableSql, conn);
            command.ExecuteNonQuery();
        }

        /// <summary>
        /// Inserts a single record from the CSV into the database.
        /// Handles null values by converting them to DBNull.
        /// </summary>
        private static void PopulateTable(SqliteConnection conn, string tableName, FootballStat footballStat)
        {
            if (conn.State == System.Data.ConnectionState.Closed)
                conn.Open();

            SqliteCommand insertSQL = new SqliteCommand(
                $"INSERT INTO {tableName} (Id, Rank, Team, Mascot, DateOfLastWin, WinningPercentage, Wins, Losses, Ties, Games) " +
                $"VALUES (@IdParam, @RankParam, @TeamParam, @MascotParam, @DateParam, @WinPercentParam, @WinParam, @LossParam, @TieParam, @GamesParam)",
                conn);

            insertSQL.Parameters.AddWithValue("@IdParam", DBNull.Value); // Auto-incremented
            insertSQL.Parameters.AddWithValue("@RankParam", footballStat.Rank ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@TeamParam", footballStat.Team ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@MascotParam", footballStat.Mascot ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@DateParam", footballStat.DateOfLastWin ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@WinPercentParam", footballStat.WinningPercentage ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@WinParam", footballStat.Wins ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@LossParam", footballStat.Losses ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@TieParam", footballStat.Ties ?? (object)DBNull.Value);
            insertSQL.Parameters.AddWithValue("@GamesParam", footballStat.Games ?? (object)DBNull.Value);

            try
            {
                insertSQL.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
