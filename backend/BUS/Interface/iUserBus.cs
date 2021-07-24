using System.Reflection;
using System;
using System.Collections.Generic;
using System.Text;
using MODELS;

namespace BUS.Interface
{
    public partial interface IuserBUS
    {
        #region auth
        userModel login(userModel user);
        userModel signUp(userModel user);
        #endregion auth
        
    }
}
