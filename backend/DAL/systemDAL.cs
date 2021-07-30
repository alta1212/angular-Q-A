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
                        var data=dt.ConvertTo<questionModal>().FirstOrDefault();
                        return data;
                    }
                     return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public  Tuple<questionModal,List <QUESTION_REPLY>> getDetailQuestion(string slug)
        {
            string msgError = "";
            try
            {
                var dt = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "QuestionDetail",
                     "@slug", slug
                     );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                      if(dt.Rows.Count>0)
                        { 
                            
                            var question=dt.ConvertTo<questionModal>().FirstOrDefault();
                            var rep = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "getReply",
                                "@id", question.QUESTION_ID
                                );
                            var reply=rep.ConvertTo<QUESTION_REPLY>().ToList();
                            return Tuple.Create(question,reply);
                        }
                     return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
               
        }
    }
}