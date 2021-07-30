using System;
using System.Collections.Generic;
using MODELS;
namespace BUS.Interface
{
    public partial interface Isystem
    {
        questionModal GetQuestiondetail(string id);
        Tuple<questionModal,List <QUESTION_REPLY>> getDetailQuestion(string slug);
    }
}