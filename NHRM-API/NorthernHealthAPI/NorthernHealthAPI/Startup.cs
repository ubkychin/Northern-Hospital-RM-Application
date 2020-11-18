using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NorthernHealthAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace NorthernHealthAPI
{
    public class Startup
    {

        public void ConfigureServices(IServiceCollection services)
        {
            //Add JWT Middleware when ready
            JWT.JWTMiddleware.ConfigureJWT(services);

            services.AddDbContext<NHRMDBContext>(opt => opt.UseSqlServer(Environment.GetEnvironmentVariable("NHRMConnection")));
            //services.AddDbContext<NHRMDBContext>(opt => opt.UseSqlServer("Server=.\\SQLExpress;Database=NHRMDB;Trusted_Connection=True;"));

            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(configure =>
                {
                    configure.AllowAnyOrigin();
                    configure.AllowAnyMethod();
                    configure.AllowAnyHeader();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();

            //May need to configure middleware for HTTPS redirection
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
