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
    public class systemController: ControllerBase
    {
     private Isystem isystemBUS;

      private IConfiguration config;
      public systemController (Isystem k,IConfiguration _config)
      {
        config=_config;
        isystemBUS=k;
      }
        
      [HttpGet]
      [Route("questionDetail/{slug}")]
      public object Deatail(string slug)
      {
          return isystemBUS.getDetailQuestion(slug);
      }
    }
}