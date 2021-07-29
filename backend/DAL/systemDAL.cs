using MODELS;
using System;

using DAL.Helper;
using System.Collections.Generic;
using DAL.Interface;
using System.Linq;

namespace DAL
{
  

    public class systemDAL : DAL.Interface.iSystemDAL
    {
        IDatabaseHelper databaseHelper;
        public systemDAL(IDatabaseHelper k)
        {
            databaseHelper=k;
        }
        public questionModal getDetail(string id)
        {
             string msgError = "";
            try
            {
                var dt = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "QuestionDetail",
                     "@slug", id
                     );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                      if(dt.Rows.Count>0)
                    {  
                        return dt.ConvertTo<questionModal>().FirstOrDefault();
                    }
                     return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static Tuple<List<questionModal>,List<QUESTION_REPLY>> getDetailQuestion()
        {
                //list1= new List<int>();
                // list2= new List<int>();
                // ...

                // return Tuple.Create(list1, list2)
                return null;
        }
    }
}