using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NorthernHealthAPI.Models;

namespace NorthernHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly NHRMDBContext _context;

        public AuthController(NHRMDBContext context)
        {
            _context = context;
        }

        // GET api/auth/login
        // Accepts a Login object - parameters userId (string) and password (string). If the model values match a user login in the database it
        // returns a JWT, otherwise Unauthorized result if details invalid, BadRequest if login details improper
        [HttpPost, Route("patient")]
        public IActionResult Login(Login login)
        {
            if (login == null)
            {
                return BadRequest(new { message = "Invalid client request" });
            }

            var passwordHash = SHA512.Create();
            passwordHash.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            var patient = (from p in _context.Patient
                           where p.UserId == login.UserId && p.Password == passwordHash.Hash
                           select new Patient { HospitalNumber = p.HospitalNumber });

            if (patient.Count() != 0)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("secret")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new[] {
                    new Claim(ClaimTypes.Role, "Patient")
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: Environment.GetEnvironmentVariable("applicationUrl"),
                    audience: Environment.GetEnvironmentVariable("applicationUrl"),
                    claims: claims,
                    expires: DateTime.Now.AddDays(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }

        //Create another Login endpoint for Admin/Clinician
    }
}
