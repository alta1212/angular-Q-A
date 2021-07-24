using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;  
using System.Linq;  

using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace Tool
{
    public class tool
    {

       public string token(IConfiguration _config)
        {
                 var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));    
                        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);    
                        var Claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Role, "login"),
                        };
                        var token = new JwtSecurityToken(_config["Jwt:Issuer"],    
                        _config["Jwt:Issuer"],    
                        Claims,    
                        // expires: DateTime.Now.AddDays(1),    
                        signingCredentials: credentials);    
                
                        return new JwtSecurityTokenHandler().WriteToken(token);    
        }
    }
}