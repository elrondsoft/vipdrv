﻿using System;
using System.Collections.Generic;
using System.Text;
using QuantumLogic.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace QuantumLogic.Data.EntityFramework
{
    public class QuantumLogicDbContext : DbContext
    {
        public QuantumLogicDbContext(DbContextOptions<QuantumLogicDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Course");
        }
    }
}
