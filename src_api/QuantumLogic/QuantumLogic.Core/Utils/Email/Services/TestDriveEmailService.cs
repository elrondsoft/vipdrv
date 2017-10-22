﻿using System;
using System.Net;
using QuantumLogic.Core.Utils.Email.Templates;
using QuantumLogic.Core.Utils.Email.Templates.TestDrive;
using SendGrid.Helpers.Mail;

namespace QuantumLogic.Core.Utils.Email.Services
{
    public class TestDriveEmailService : ITestDriveEmailService
    {
        protected const string CompleteBookingSubject = "Thak you for complete booking";
        protected const string NewLeadNotificationSubject = "New Lead!";
        protected const string DealerInvitationSubject = "Welcome to TetsDrive";
        protected static EmailAddress EmailFrom = new EmailAddress("test@example.com", "Example User");
        protected IEmailProvider EmailProvider { get; private set; }

        public TestDriveEmailService(IEmailProvider emailProvider)
        {
            EmailProvider = emailProvider;
        }

        public HttpStatusCode SendTestDriveEmail(EmailAddress emailTo, string subject, IEmailTemplate emailTemplate)
        {
            if (emailTo == null)
            {
                throw new ArgumentException(nameof(emailTo));
            }
            if (emailTemplate == null)
            {
                throw new ArgumentException(nameof(emailTemplate));
            }

            return EmailProvider.SendEmail(emailTo, EmailFrom, subject, emailTemplate.AsPlainText(), emailTemplate.AsHtml());
        }

        public HttpStatusCode SendDealerInvitationEmail(EmailAddress emailTo, IEmailTemplate emailTemplate)
        {
            return EmailProvider.SendEmail(emailTo, EmailFrom, DealerInvitationSubject, emailTemplate.AsPlainText(), emailTemplate.AsHtml());
        }

        public HttpStatusCode SendCompleteBookingEmail(EmailAddress emailTo, IEmailTemplate emailTemplate)
        {
            return EmailProvider.SendEmail(emailTo, EmailFrom, CompleteBookingSubject, emailTemplate.AsPlainText(), emailTemplate.AsHtml());
        }

        public HttpStatusCode SendNewLeadNotificationEmail(EmailAddress emailTo, IEmailTemplate emailTemplate)
        {
            return EmailProvider.SendEmail(emailTo, EmailFrom, NewLeadNotificationSubject, emailTemplate.AsPlainText(), emailTemplate.AsHtml());
        }
    }
}
