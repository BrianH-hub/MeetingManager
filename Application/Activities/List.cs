using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Meetings
{
    public class List
    {
        public class Query : IRequest<List<Meeting>> { }

        public class Handler : IRequestHandler<Query, List<Meeting>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Meeting>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Meetings = await _context.Meetings.ToListAsync();

                return Meetings;
            }
        }
    }
}