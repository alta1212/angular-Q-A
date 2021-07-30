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
        public questionModal GetQuestiondetail(string id)
        {
           return systemDAl.getDetail(id);
        }
        public Tuple<questionModal,List <QUESTION_REPLY>> getDetailQuestion(string slug)
        {
            return systemDAl.getDetailQuestion(slug);
        }
    }
}