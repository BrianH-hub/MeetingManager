using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Meetings
{
    public class Details
    {
        public class Query : IRequest<Meeting>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Meeting>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Meeting> Handle(Query request, CancellationToken cancellationToken)
            {
                var Meeting = await _context.Meetings.FindAsync(request.Id);

                return Meeting;
            }
        }
    }
}