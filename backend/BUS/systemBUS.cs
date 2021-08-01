using MODELS;
using DAL.Interface;
using System;
using System.Collections.Generic;

namespace BUS
{
    public class systemBUS : BUS.Interface.Isystem
    {
        private iSystemDAL systemDAl;
        public systemBUS (iSystemDAL k)
        {
            systemDAl=k;
        }
     
        public  Tuple<questionModal,List <QUESTION_REPLY>,List <Comment>> getDetailQuestion(string slug)
        {
            return systemDAl.getDetailQuestion(slug);
        }
    }
}