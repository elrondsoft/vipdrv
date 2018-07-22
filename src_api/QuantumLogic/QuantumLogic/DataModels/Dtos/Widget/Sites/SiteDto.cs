﻿using QuantumLogic.Core.Domain.Entities.WidgetModule;
using System.Linq;

namespace QuantumLogic.WebApi.DataModels.Dtos.Widget.Sites
{
    public class SiteDto : EntityDto<Site, int>
    {
        public int UserId { get; set; }
        public string BeautyId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Contacts { get; set; }
        public string ImageUrl { get; set; }
        public int LeadsAmount { get; set; }
        public int NewLeadsAmount { get; set; }
        public string DealerName { get; set; }
        public string DealerAddress { get; set; }
        public string DealerPhone { get; set; }
        public string OwnerName { get; set; }
        public string WidgetAsSeparatePageUrl { get; set; }
        public string ZipCode { get; set; }
        public bool AvailableTestDriveFromHome { get; set; }
        public int MaxVehicleDeliveryDistance { get; set; }

        public int UsedVehiclesCount { get; set; }
        public int NewVehiclesCount { get; set; }

        #region Mapping

        public override void MapFromEntity(Site entity)
        {
            base.MapFromEntity(entity);
            UserId = entity.UserId;
            BeautyId = entity.BeautyId;
            Name = entity.Name;
            Url = entity.Url;
            Contacts = entity.NotificationContacts;
            ImageUrl = entity.ImageUrl;
            LeadsAmount = entity.Leads.Count;
            NewLeadsAmount = entity.Leads.Count(r => r.IsNew);
            DealerName = entity.DealerName;
            DealerAddress = entity.DealerAddress;
            DealerPhone = entity.DealerPhone;
            OwnerName = entity.User.FullName;
            WidgetAsSeparatePageUrl = entity.WidgetAsSeparatePageUrl;
            ZipCode = entity.ZipCode;
            AvailableTestDriveFromHome = entity.AvailableTestDriveFromHome;
            MaxVehicleDeliveryDistance = entity.MaxVehicleDeliveryDistance;

            UsedVehiclesCount = entity.UsedVehiclesCount;
            NewVehiclesCount = entity.NewVehiclesCount;
        }
        public override Site MapToEntity()
        {
            Site entity = base.MapToEntity();
            entity.UserId = UserId;
            entity.BeautyId = BeautyId;
            entity.Name = Name;
            entity.Url = Url;
            entity.NotificationContacts = Contacts;
            entity.ImageUrl = ImageUrl;
            entity.DealerName = DealerName;
            entity.DealerAddress = DealerAddress;
            entity.DealerPhone = DealerPhone;
            entity.WidgetAsSeparatePageUrl = WidgetAsSeparatePageUrl;
            entity.ZipCode = ZipCode;
            entity.AvailableTestDriveFromHome = AvailableTestDriveFromHome;
            entity.MaxVehicleDeliveryDistance = MaxVehicleDeliveryDistance;
            return entity;
        }

        #endregion

        #region Normalization

        public override void NormalizeAsRequest()
        { }
        public override void NormalizeAsResponse()
        { }

        #endregion
    }
}
