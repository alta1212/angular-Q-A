namespace MODELS
{
    public class QUESTION_REPLY
    {
        public int  QUESTION_REPLY_ID {get;set;}
        public int  QUESTION_ID {get;set;}
        public int  PIN  {get;set;}
        public string QUESTION_DETAIL {get;set;}
        public string QUESTION_IMAGE {get;set;}
        public int  author {get;set;}
        public string time {get;set;}
        public string author_name {get;set;}
        public string  author_image {get;set;}
    }
}