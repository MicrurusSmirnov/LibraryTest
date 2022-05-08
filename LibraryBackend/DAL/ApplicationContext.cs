using Microsoft.EntityFrameworkCore;
using LibraryBackend.Models;

namespace LibraryBackend.DAL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Book> Books { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().HasData(
                    new Book { Id = 1, Title = "Азбука", Year = 2000, Genre = "учебник", Author = "Минпросвещение" },
                   new Book { Id = 2, Title = "Вторая", Year = 2022, Genre = "юмор", Author = "С. Кинг" }
            );

            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
        }
    }
}
