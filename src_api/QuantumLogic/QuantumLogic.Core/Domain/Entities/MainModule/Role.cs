﻿using System.Collections.Generic;

namespace QuantumLogic.Core.Domain.Entities.MainModule
{
    public class Role : Entity<int>, IUpdatableFrom<Role>, IValidable
    {
        public string Name { get; set; }
        public bool CanBeUsedForInvitation { get; set; }
        public virtual ICollection<RoleClaim> RoleClaims { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

        #region Ctors

        public Role()
            : base()
        {
            RoleClaims = new HashSet<RoleClaim>();
            UserRoles = new HashSet<UserRole>();
        }

        public Role(int id, string name)
            : this(id, name, new HashSet<RoleClaim>(), new HashSet<UserRole>())
        { }

        public Role(int id, string name, ICollection<RoleClaim> roleClaims, ICollection<UserRole> userRoles)
            : base(id)
        {
            Name = name;
            RoleClaims = roleClaims;
            UserRoles = userRoles;
        }

        #endregion

        public override string ToString()
        {
            return $"{Name}";
        }

        #region IUpdatableFrom implementation

        public void UpdateFrom(Role actualEntity)
        {
            Name = actualEntity.Name;
            CanBeUsedForInvitation = actualEntity.CanBeUsedForInvitation;
        }

        #endregion

        #region IValidable implementation

        public bool IsValid()
        {
            return InnerValidate(false);
        }
        public void Validate()
        {
            InnerValidate(true);
        }
        protected virtual bool InnerValidate(bool throwException)
        {
            return true;
        }

        #endregion
    }
}
