﻿using System;
using MODELS;
using DAL.Helper;
using System.Collections.Generic;
using DAL.Interface;

using System.Linq;
namespace DAL
{
    public class userDAl:DAL.Interface.iUserDAl
    {
        IDatabaseHelper databaseHelper;
        public userDAl(IDatabaseHelper k)
        {
            databaseHelper=k;
        }
        #region auth

        public  userModel login(userModel user)
        {       
            string msgError = "";
            try
            {
                var dt = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "userLogin",
                     "@usermail", user.USER_EMAIL,
                     "@userpassword", user.USER_PASSWORD
                     );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                      if(dt.Rows.Count>0)
                    {
                        return dt.ConvertTo<userModel>().FirstOrDefault();
                    }
                     return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
         
        }
        public  userModel signUp(userModel user){

            string msgError = "";
            try
            {
                var dt = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "userSignup",
                     "@username", user.USER_NAME,
                     "@usermail", user.USER_EMAIL,
                     "@userpassword", user.USER_PASSWORD,
                     "@slug",user.slug
                     );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<userModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        #endregion auth
    }
}
