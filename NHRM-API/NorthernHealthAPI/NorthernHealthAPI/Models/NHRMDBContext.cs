using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NorthernHealthAPI.Models
{
    public partial class NHRMDBContext : DbContext
    {
        public NHRMDBContext()
        {
        }

        public NHRMDBContext(DbContextOptions<NHRMDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<CategoryMeasurement> CategoryMeasurement { get; set; }
        public virtual DbSet<Measurement> Measurement { get; set; }
        public virtual DbSet<MeasurementDataPoint> MeasurementDataPoint { get; set; }
        public virtual DbSet<MeasurementResult> MeasurementResult { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<PatientCategory> PatientCategory { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("NHRMConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasColumnName("categoryName")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<CategoryMeasurement>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.MeasurementId).HasColumnName("measurementID");

                entity.HasOne(d => d.Category)
                    .WithMany()
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_CategoryMeasurement_Category");

                entity.HasOne(d => d.Measurement)
                    .WithMany()
                    .HasForeignKey(d => d.MeasurementId)
                    .HasConstraintName("FK_CategoryMeasurement_Measurement");
            });

            modelBuilder.Entity<Measurement>(entity =>
            {
                entity.Property(e => e.MeasurementId).HasColumnName("measurementID");

                entity.Property(e => e.MeasurementName)
                    .HasColumnName("measurementName")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MeasurementDataPoint>(entity =>
            {
                entity.HasKey(e => new { e.MeasurementId, e.DataPointNumber });

                entity.Property(e => e.MeasurementId).HasColumnName("measurementID");

                entity.Property(e => e.DataPointNumber).HasColumnName("dataPointNumber");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LowerLimit).HasColumnName("lowerLimit");

                entity.Property(e => e.UpperLimit).HasColumnName("upperLimit");

                entity.HasOne(d => d.Measurement)
                    .WithMany(p => p.MeasurementDataPoint)
                    .HasForeignKey(d => d.MeasurementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MeasurementDataPoint_Measurement");
            });

            modelBuilder.Entity<MeasurementResult>(entity =>
            {
                entity.HasKey(e => new { e.MeasurementId, e.DataPointNumber, e.HospitalNumber, e.CategoryId, e.TimeStamp });

                entity.Property(e => e.MeasurementId).HasColumnName("measurementID");

                entity.Property(e => e.DataPointNumber).HasColumnName("dataPointNumber");

                entity.Property(e => e.HospitalNumber)
                    .HasColumnName("hospitalNumber")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("timeStamp")
                    .HasColumnType("datetime");

                entity.Property(e => e.Value).HasColumnName("value");

                entity.HasOne(d => d.PatientCategory)
                    .WithMany(p => p.MeasurementResult)
                    .HasForeignKey(d => new { d.CategoryId, d.HospitalNumber })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MeasurementResult_PatientCategory");

                entity.HasOne(d => d.MeasurementDataPoint)
                    .WithMany(p => p.MeasurementResult)
                    .HasForeignKey(d => new { d.MeasurementId, d.DataPointNumber })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MeasurementResult_MeasurementDataPoint");
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(e => e.HospitalNumber);

                entity.Property(e => e.HospitalNumber)
                    .HasColumnName("hospitalNumber")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50);

                entity.Property(e => e.CountryOfBirth)
                    .IsRequired()
                    .HasColumnName("countryOfBirth")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Dob)
                    .HasColumnName("DOB")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("gender")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HomeNumber)
                    .HasColumnName("homeNumber")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LivesAlone).HasColumnName("livesAlone");

                entity.Property(e => e.MobileNumber)
                    .HasColumnName("mobileNumber")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(64)
                    .IsFixedLength();

                entity.Property(e => e.Postcode)
                    .IsRequired()
                    .HasColumnName("postcode")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.PreferredLanguage)
                    .IsRequired()
                    .HasColumnName("preferredLanguage")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Salt)
                    .IsRequired()
                    .HasColumnName("salt");

                entity.Property(e => e.Suburb)
                    .IsRequired()
                    .HasColumnName("suburb")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userID")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PatientCategory>(entity =>
            {
                entity.HasKey(e => new { e.CategoryId, e.HospitalNumber });

                entity.Property(e => e.CategoryId).HasColumnName("categoryID");

                entity.Property(e => e.HospitalNumber)
                    .HasColumnName("hospitalNumber")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.PatientCategory)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PatientCategory_Category");

                entity.HasOne(d => d.HospitalNumberNavigation)
                    .WithMany(p => p.PatientCategory)
                    .HasForeignKey(d => d.HospitalNumber)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PatientCategory_Patient");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK_Admin");

                entity.Property(e => e.Username)
                    .HasColumnName("username")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(64)
                    .IsFixedLength();

                entity.Property(e => e.Salt)
                    .IsRequired()
                    .HasColumnName("salt");

                entity.Property(e => e.UserType)
                    .IsRequired()
                    .HasColumnName("userType")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
