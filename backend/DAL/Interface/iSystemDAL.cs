using System.Reflection;
using System;
using System.Collections.Generic;
using System.Text;
using MODELS;
namespace DAL.Interface
{
    public partial interface iSystemDAL
    {
        #region  question
        questionModal getDetail(string id);
        #endregion question
    }
}