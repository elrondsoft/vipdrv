﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuantumLogic.Core.Domain.Entities.WidgetModule;
using QuantumLogic.Core.Domain.Services.Widget.Experts;
using QuantumLogic.Core.Domain.UnitOfWorks;
using QuantumLogic.WebApi.DataModels.Dtos.Widget.Experts;
using QuantumLogic.WebApi.DataModels.Requests;
using QuantumLogic.WebApi.DataModels.Requests.Widget.Experts;
using QuantumLogic.WebApi.DataModels.Responses;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace QuantumLogic.WebApi.Controllers.Widget
{
    [Route("api/expert")]
    public class ExpertController : EntityExtendedController<Expert, int, ExpertDto, ExpertFullDto>
    {
        #region Ctors

        public ExpertController(IQLUnitOfWorkManager uowManager, IExpertDomainService domainService)
            : base(uowManager, domainService)
        { }

        #endregion

        #region CRUD

        [HttpGet("{id}")]
        public Task<ExpertFullDto> GetAsync(int id)
        {
            return InnerGetAsync(id);
        }
        [Authorize]
        [HttpPost]
        public Task<ExpertFullDto> CreateAsync([FromBody]ExpertFullDto request)
        {
            return InnerCreateAsync(request);
        }
        [Authorize]
        [HttpPut]
        public Task<ExpertFullDto> UpdateAsync([FromBody]ExpertFullDto request)
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
        public Task<GetAllResponse<ExpertDto>> GetAllAsync([FromBody]ExpertGetAllRequest request, uint page = 0, uint pageSize = 0)
        {
            Expression<Func<Expert, bool>> filter = (entity) =>
                (!request.UserId.HasValue || request.UserId.Value == entity.Site.UserId) &&
                (!request.SiteId.HasValue || request.SiteId.Value == entity.SiteId) &&
                (String.IsNullOrEmpty(request.SiteBeautyId) || request.SiteBeautyId == entity.Site.BeautyId);

            return InnerGetAllAsync(filter, request.Sorting, page, pageSize);
        }

        #endregion

        #region Extended metods

        [Authorize]
        [HttpPatch("change-activity/{id}")]
        public Task ChangeActivityAsync([FromBody]ChangeActivityRequest request, int id)
        {
            return ChangeActivityAsync(id, request.Value);
        }
        [Authorize]
        [HttpPatch("change-order/{id}")]
        public Task ChangeOrderAsync([FromBody]ChangeOrderRequest request, int id)
        {
            return ChangeOrderAsync(id, request.Value);
        }
        [Authorize]
        [HttpPatch("swap-orders")]
        public Task SwapOrdersAsync([FromBody]SwapOrdersRequest<int> request)
        {
            return SwapOrdersAsync(request.Key1, request.Key2);
        }

        #endregion
    }
}
