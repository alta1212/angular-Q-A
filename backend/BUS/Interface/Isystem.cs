using System;
using System.Collections.Generic;
using MODELS;
namespace BUS.Interface
{
    public partial interface Isystem
    {
       
        Tuple<questionModal,List <QUESTION_REPLY>,List <Comment>> getDetailQuestion(string slug);
        object getQuestion();
    }
}