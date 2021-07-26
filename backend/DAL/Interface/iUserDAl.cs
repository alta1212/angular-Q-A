using System.Reflection;
using System;
using System.Collections.Generic;
using System.Text;
using MODELS;

namespace DAL.Interface
{
    public partial interface iUserDAl
    {
        
        #region auth
        userModel login(userModel user);
        userModel signUp(userModel user);
       
        #endregion auth
        #region  ask
        questionModal ask(questionModal q);
        
        #endregion  ask
    }
}
