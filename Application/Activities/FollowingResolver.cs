using System.Linq;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Persistence;

namespace Application.Activities {
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool> {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public FollowingResolver (DataContext context, IUserAccessor userAccessor) {
            _userAccessor = userAccessor;
            _context = context;
        }

        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefault(x => x.UserName ==
              _userAccessor.GetCurrentUsername());

            if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
            {
                return true;
            }
            return false;
        }
    }
}