﻿using System;
using System.Globalization;
using System.Text.RegularExpressions;
using QuantumLogic.Core.Constants;
using QuantumLogic.Core.Domain.Entities.WidgetModule;
using QuantumLogic.Core.Utils.Email.Data.Templates.Arguments;

namespace QuantumLogic.Core.Utils.Email.Data.Templates
{
    public class EleadAdfTemplate : IEmailTemplate
    {
        public DateTime? BookingDateTimeUtc { get; }
        public int TimeZoneOffset { get; }
        public string FirstName { get; }
        public string SecondName { get; }
        public string UserPhone { get; }
        public string UserEmail { get; }
        public string UserComments { get; }
        public string SiteName { get; }
        public string DealerName { get; }
        public string ExpertName { get; }
        public string BeverageName { get; }
        public string RouteTitle { get; }
        public string DealerPeakSalesId { get; }
        public IVehicle Vehicle { get; }

        public EleadAdfTemplate(
            DateTime bookingDateTimeUtc,
            int timeZoneOffset,
            string firstName,
            string secondName,
            string userPhone,
            string userEmail,
            string userComments,
            string siteName,
            string dealerName,
            string expertName,
            string beverageName,
            string routeTitle,
            string dealerPeakSalesId,
            IVehicle vehicle)
        {
            BookingDateTimeUtc = bookingDateTimeUtc;
            TimeZoneOffset = timeZoneOffset;
            FirstName = firstName;
            SecondName = secondName;
            UserPhone = userPhone;
            UserEmail = userEmail;
            UserComments = userComments;
            SiteName = siteName;
            DealerName = dealerName;
            ExpertName = expertName;
            BeverageName = beverageName;
            RouteTitle = routeTitle;
            DealerPeakSalesId = dealerPeakSalesId;
            Vehicle = vehicle;
        }

        public EleadAdfTemplate(Lead lead, IVehicle vehicle, int timeZoneOffset = 0)
        {
            BookingDateTimeUtc = lead.BookingDateTimeUtc;
            TimeZoneOffset = timeZoneOffset;
            FirstName = lead.FirstName;
            SecondName = lead.SecondName;
            UserPhone = lead.UserPhone;
            UserEmail = lead.UserEmail;
            UserComments = lead.UserComment;
            SiteName = lead.Site?.Name;
            DealerName = lead.Site?.DealerName;
            ExpertName = (lead.Expert != null) ? lead.Expert.Name : null;
            BeverageName = (lead.Beverage != null) ? lead.Beverage.Name : null;
            RouteTitle = (lead.Route != null) ? lead.Route.Name : null;
            DealerPeakSalesId = (lead.Expert != null) ? lead.Expert.EmployeeId : string.Empty;
            Vehicle = vehicle;
        }

        protected string VehiclePriceXmlNode(IVehicle vehicle)
        {
            // < !-- numeric, e.g. 19500 --> <!-- type:quote|offer|msrp|invoice|call|appraisal|asking; currency:ISO 4217 3-letter code; delta:absolute|relative|percentage; relativeto:msrp|invoice; source:free text; -->

            string type = "";
            string price = "";
            string currency = "USD";
            if (!String.IsNullOrWhiteSpace(vehicle.Msrp))
            {
                type = "msrp";
                price = Regex.Replace(vehicle.Msrp, "[^0-9]", "");
            }

            return $"<price type=\"{type}\" currency=\"{currency}\" delta=\"\" relativeto=\"\" source=\"\">{price}</price>";
        }

        protected string BookingDataAsComment(string bookingDateTime, string expertName, string beverageName, string routeName, string userComments)
        {
            string bookingDateTimeNode = !string.IsNullOrEmpty(bookingDateTime) ? $"{bookingDateTime}" : "Skipped by customer";
            string expertNameNode = !string.IsNullOrEmpty(expertName) ? $"{expertName};" : "Skipped by customer";
            string beverageNameNode = !string.IsNullOrEmpty(beverageName) ? $"{beverageName};" : "Skipped by customer";
            string routeNameNode = !string.IsNullOrEmpty(routeName) ? $"{routeName};" : "Skipped by customer";
            string userCommentsNode = !string.IsNullOrEmpty(userComments) ? $"{userComments};" : "-";

            return $"Test Drive DateTime: {bookingDateTimeNode}; Sales Person: {expertNameNode}; Beverage: {beverageNameNode}; Test Drive Route: {routeNameNode}; User Comments: {userCommentsNode};";
        }

        public string VendorName(string dealerName, string expertName)
        {
            return !string.IsNullOrEmpty(expertName) ? $"<vendorname>{DealerName} [Attn: {ExpertName}]</vendorname>" : "";
        }

        public string AsHtml()
        {
            string recieveDateTime = DateTime.UtcNow
                .Add(new TimeSpan(0, -TimeZoneOffset, 0))
                .ToString(QuantumLogicConstants.OutputDateTimeFormat, CultureInfo.InvariantCulture);

            string bookingDateTime = "Skipped by customer";
            if (BookingDateTimeUtc != null)
            {
                bookingDateTime = BookingDateTimeUtc.GetValueOrDefault()
                    .Add(new TimeSpan(0, -TimeZoneOffset, 0))
                    .ToString(QuantumLogicConstants.UsaTimeFormat, CultureInfo.InvariantCulture);
            }

            var xml = $"<?xml version=\"1.0\"?>" +
                      $"<?adf version=\"1.0\"?>" +
                      $"<adf>" +
                          $"<prospect status=\"\">" +
                              $"<id sequence=\"{DealerName}\" source=\"{SiteName}\"></id>" +
                              $"<requestdate>{recieveDateTime}</requestdate>" +
                              $"<vehicle interest=\"test-drive\" status=\"{Vehicle.Condition}\">" + // < !-- interest:buy|lease|sell|trade-in|test-drive; status:new|used; -->
                                  $"<year>{Vehicle.Year}</year>" +
                                  $"<make>{Vehicle.Make}</make>" +
                                  $"<model>{Vehicle.Model}</model>" +
                                  $"<stock>{Vehicle.Stock}</stock>" +
                                  $"<vin>{Vehicle.Vin}</vin>" +
                              $"</vehicle>" +
                              $"<customer>" +
                                  $"<contact>" +
                                      $"<name part=\"first\">{FirstName}</name>" +
                                      $"<name part=\"last\">{SecondName}</name>" +
                                      $"<phone type=\"cellphone\">{UserPhone}</phone>" +
                                      $"<email>{UserEmail}</email>" +
                                  $"</contact>" +
                                  $"<comments>" +
                                        BookingDataAsComment(bookingDateTime, ExpertName, BeverageName, RouteTitle, UserComments) +
                                  $"</comments>" +
                              $"</customer>" +
                              $"<vendor>" +
                                    VendorName(DealerName, ExpertName) +
                                  //$"<contact>" +
                                  //    $"<name part=\"full\">{DealerName}</name>" +
                                  //$"</contact>" +
                              $"</vendor>" +
                              $"<provider>" +
                                $"<name>VIPdrv Test Drive</name>" + 
                              $"</provider>" +
                              $"<salesperson>" +
                                $"<id source=\"DealerPeak\">{DealerPeakSalesId}</id>" +
                              $"</salesperson>" +
                              $"<agent>" + 
                                $"{DealerPeakSalesId}" +
                              $"</agent>" +
                          $"</prospect>" +
                      $"</adf>";

            return xml;
        }

        public string AsPlainText()
        {
            return AsHtml();
        }
    }
}
