﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using QuantumLogic.Core;
using QuantumLogic.Core.Domain.Entities.MainModule;
using QuantumLogic.Core.Domain.Entities.WidgetModule;
using QuantumLogic.Core.Domain.Repositories;
using QuantumLogic.Core.Domain.Repositories.Main;
using QuantumLogic.Core.Domain.Repositories.WidgetModule;
using QuantumLogic.Core.Domain.UnitOfWorks;
using QuantumLogic.Core.Utils.Modules;
using QuantumLogic.Core.Utils.Modules.Attributes;
using QuantumLogic.Data.EFContext;
using QuantumLogic.Data.EFUnitOfWork;
using QuantumLogic.Data.Repositories.Main;
using QuantumLogic.Data.Repositories.Widget;
using System;

namespace QuantumLogic.Data
{
    [DependsOn(typeof(CoreModule))]
    public class DataModule : Module
    {
        protected override void Configure(IServiceProvider services)
        { }

        protected override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<DbContextManager>();
            services.AddTransient<DbContext, QuantumLogicDbContext>();
            services.AddTransient<IQLUnitOfWork, QuantumLogicUnitOfWork>();
            services.AddTransient<IQLUnitOfWorkManager, QuantumLogicUnitOfWorkManager>();

            #region Repositories

            //services.Add(ServiceDescriptor.Transient(typeof(IQLRepository<,>), typeof(EFRepository<,>)));

            services.AddTransient<IQLRepository<Invitation, int>, InvitationRepository>();
            services.AddTransient<IInvitationRepository, InvitationRepository>();
            services.AddTransient<IQLRepository<User, int>, UserRepository>();
            services.AddTransient<IUserRepository, UserRepository>();

            services.AddTransient<IQLRepository<Beverage, int>, BeverageRepository>();
            services.AddTransient<IQLRepositoryX<Beverage, int>, BeverageRepository>();
            services.AddTransient<IBeverageRepository, BeverageRepository>();
            services.AddTransient<IQLRepository<Expert, int>, ExpertRepository>();
            services.AddTransient<IQLRepositoryX<Expert, int>, ExpertRepository>();
            services.AddTransient<IExpertRepository, ExpertRepository>();
            services.AddTransient<IQLRepository<Lead, int>, LeadRepository>();
            services.AddTransient<ILeadRepository, LeadRepository>();
            services.AddTransient<IQLRepository<Route, int>, RouteRepository>();
            services.AddTransient<IQLRepositoryX<Route, int>, RouteRepository>();
            services.AddTransient<IRouteRepository, RouteRepository>();
            services.AddTransient<IQLRepository<Site, int>, SiteRepository>();
            services.AddTransient<ISiteRepository, SiteRepository>();

            #endregion
        }
    }
}
