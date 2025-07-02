using Microsoft.AspNetCore.Identity;

namespace VietTale_Api.Models
{
    public class AppUser : IdentityUser
    {
        public Guid? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiresOn { get; set; }

        public ICollection<UserSavedLesson>? SavedLessons { get; set; }
    }
}
