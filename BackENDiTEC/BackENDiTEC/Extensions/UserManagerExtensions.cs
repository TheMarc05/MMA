using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using BackENDiTEC.Areas.Identity.Data;

namespace BackENDiTEC.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<string> GetFirstName(this UserManager<ApplicationUser> userManager, ClaimsPrincipal user)
        {
            var applicationUser = await userManager.GetUserAsync(user);
            return applicationUser?.FirstName ?? "Utilizator";
        }

        public static async Task<string> GetLastName(this UserManager<ApplicationUser> userManager, ClaimsPrincipal user)
        {
            var applicationUser = await userManager.GetUserAsync(user);
            return applicationUser?.LastName ?? "Utilizator";
        }
    }
} 