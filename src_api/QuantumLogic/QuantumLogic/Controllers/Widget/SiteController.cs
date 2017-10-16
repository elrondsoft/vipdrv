﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuantumLogic.Core.Domain.Entities.WidgetModule;
using QuantumLogic.Core.Domain.Services.Widget.Sites;
using QuantumLogic.Core.Domain.UnitOfWorks;
using QuantumLogic.WebApi.DataModels.Dtos.Widget.Sites;
using QuantumLogic.WebApi.DataModels.Requests.Widget.Sites;
using QuantumLogic.WebApi.DataModels.Responses;
using QuantumLogic.WebApi.DataModels.Responses.Widget.Site;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace QuantumLogic.WebApi.Controllers.Widget
{
    [Route("api/site")]
    public class SiteController : EntityController<Site, int, SiteDto, SiteFullDto>
    {
        #region Ctors

        public SiteController(IQLUnitOfWorkManager uowManager, ISiteDomainService domainService)
            : base(uowManager, domainService)
        { }

        #endregion

        #region CRUD

        [HttpGet("{id}")]
        public Task<SiteFullDto> GetAsync(int id)
        {
            return InnerGetAsync(id);
        }
        [Authorize]
        [HttpPost]
        public Task<SiteFullDto> CreateAsync([FromBody]SiteFullDto request)
        {
            return InnerCreateAsync(request);
        }
        [Authorize]
        [HttpPut]
        public Task<SiteFullDto> UpdateAsync([FromBody]SiteFullDto request)
        {
            return InnerUpdateAsync(request);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public Task DeleteAsync(int id)
        {
            return InnerDeleteAsync(id);
        }

        #endregion

        #region Methods to operate with many entities

        [HttpPost("get-all/{page?}/{pageSize?}")]
        public Task<GetAllResponse<SiteDto>> GetAllAsync([FromBody]SiteGetAllRequest request, uint page = 0, uint pageSize = 0)
        {
            Expression<Func<Site, bool>> filter = (entity) => request.UserId == null || request.UserId == entity.UserId;
            return InnerGetAllAsync(filter, request.Sorting, page, pageSize);
        }

        #endregion

        #region Special methods

        [Authorize]
        [HttpPatch("change-contacts/{id}")]
        public async Task ChangeContactsAsync(int id, [FromBody]ChangeContactsRequest request)
        {
            using (var uow = UowManager.CurrentOrCreateNew(true))
            {
                await ((ISiteDomainService)DomainService).ChangeContactsAsync(id, request.Value);
                await uow.CompleteAsync();
            }
        }
        [HttpGet("{id}/week-schedule")]
        public async Task<SiteWeekSchedule> GetWeekSchedule(int id)
        {
            SiteWeekSchedule schedule;
            using (var uow = UowManager.CurrentOrCreateNew(true))
            {
                schedule = new SiteWeekSchedule(id, await ((ISiteDomainService)DomainService).RetrieveWeekSchedule(id));
            }
            return schedule;
        }

        #endregion
    }
}
