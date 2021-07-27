using MODELS;
using DAL.Interface;
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
    }
}