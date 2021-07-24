using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using System.Text;
using Slugify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Google.Authenticator;
using MODELS;
using Tool;
using BUS.Interface;
using Newtonsoft.Json;
namespace backend.Controllers
{

    [ApiController]
    [Route("[controller]")]

    public class userController : ControllerBase
    {   
      private IuserBUS iuserBUS;

      private IConfiguration config;
      public userController (IuserBUS k,IConfiguration _config)
      {
        config=_config;
        iuserBUS=k;
      }

        [HttpGet]
        [Authorize(Roles = "login")]
        [Route("testau")]
        public string s()
        {
          return "sâ";
        }

      Tool.tool tool= new Tool.tool();
      SlugHelper helper = new SlugHelper();
      #region 2fa
     
      
        //sau này sẽ cho vào seesion
        private const string key = "Alta122@";

        static userModel User_;

        [Route("getQr2fa")]
        [HttpPost]
        public object create2FaQrCode(userModel user)
        {
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            string UserUniqueKey =user.USER_EMAIL+key; 
            //   var hash =System.Text.Encoding.UTF8.GetBytes(UserUniqueKey);
            
            //  return System.Text.Encoding.UTF8.GetString(hash);
           // k=UserUniqueKey;//cho vào session để  so sánh
            var setupInfo = tfa.GenerateSetupCode("Disilab", user.USER_EMAIL, UserUniqueKey,false,10);
            return setupInfo.QrCodeSetupImageUrl;
          
        }
        [Route("check2fa")]
        [HttpPost]
        public userModel verify2Fa(twofaVerifyCode code)
        {
           
          
                TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
              
                bool isValid = tfa.ValidateTwoFactorPIN(code.UserUniqueKey+key, code.code);
              //  bool isValid = tfa.ValidateTwoFactorPIN(code.UserUniqueKey, code.code);
                if (isValid)
                {

                  User_.token=tool.token(config);
               
                  return User_;
                }
                return null;
        }
       
      #endregion 2fa
      #region auth
      [HttpPost]
      [Route("login")]
      public object login(userModel user)
      {
        user =iuserBUS.login(user);
        if(user!=null)
        {
          if(iuserBUS.login(user).Tfa=="0")//kiếm tra nếu người dùng bật 2fa
          {
               user.token=tool.token(config);
               return user; 
          }
          User_=user;
          return user;//không tạo token truy cập đến khi xác thực đƯợc 2fa
        }
        return null;
        
   

      }
      [HttpPost]
      [Route("signup")]
      public userModel signup(userModel user)
      {
        user.slug=helper.GenerateSlug(user.USER_NAME);
        iuserBUS.signUp(user);
        //viêt code lưu database
        return user;

      }
      #endregion auth
    }
    
}