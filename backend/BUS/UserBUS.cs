using BUS.Interface;
using MODELS;
using DAL.Interface;
namespace BUS
{
    public class UserBUS : BUS.Interface.IuserBUS
    {

        private iUserDAl userDAl;
        public UserBUS (iUserDAl k)
        {
            userDAl=k;
        }

        public questionModal ask(questionModal q)
        {
           
           return userDAl.ask(q);
        }

        public userModel login(userModel user)
        {
            return userDAl.login(user);
        }

        public userModel signUp(userModel user)
        {
           return userDAl.signUp(user);
        }
    }
}