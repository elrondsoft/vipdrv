﻿using QuantumLogic.Core.Domain.Entities.WidgetModule;
using QuantumLogic.Core.Domain.Validation.Widget;

namespace QuantumLogic.WebApi.Validation.Widget
{
    public class BeverageValidationService : NullEntityExtendedValidationService<Beverage, int>, IBeverageValidationService
    {
        #region Ctors

        public BeverageValidationService()
            : base()
        { }

        #endregion
    }
}
