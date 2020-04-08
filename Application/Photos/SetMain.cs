using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _useraccessor;
            public Handler(DataContext context, IUserAccessor useraccessor)
            {
                _useraccessor = useraccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _context.Users
                .SingleOrDefault(x => x.UserName == _useraccessor.GetCurrentUsername());

                var photo = user.Photos.SingleOrDefault(x => x.Id == request.Id);

                if(photo==null)
                    throw new RestException(HttpStatusCode.NotFound,
                    new { Photos = "not found" });

                var currentMain = user.Photos.SingleOrDefault(x => x.IsMain);

                currentMain.IsMain = false;
                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}