using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Meetings
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var Meeting = await _context.Meetings.FindAsync(request.Id);    

                if (Meeting == null)
                    throw new Exception("Could not find Meeting");

                Meeting.Title = request.Title ?? Meeting.Title;            
                Meeting.Description = request.Description ?? Meeting.Description;            
                Meeting.Category = request.Category ?? Meeting.Category;            
                Meeting.Date = request.Date ?? Meeting.Date;            
                Meeting.City = request.City ?? Meeting.City;            
                Meeting.Venue = request.Venue ?? Meeting.Venue;            

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}