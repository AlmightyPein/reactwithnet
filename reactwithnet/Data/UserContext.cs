using Microsoft.EntityFrameworkCore;
using reactwithnet.Models;

namespace reactwithnet.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        
        }
        public DbSet<UserModel> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("Users").HasIndex(u=>u.Username).IsUnique();//.HasKey(u=> new {u.UserId, u.Username});
            
        }
    }
}