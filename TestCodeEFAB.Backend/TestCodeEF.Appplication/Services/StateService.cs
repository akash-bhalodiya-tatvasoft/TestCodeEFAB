using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TestCodeEF.Application;
using TestCodeEF.Appplication.Common;
using TestCodeEF.Infrastructure.Data;

namespace TestCodeEFAB.Application.Interface
{
    public class StateService : IStateService
    {

        // This dependency injection code is auto-generated.
        // Please review and update it according to your project's architecture and structure.
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly ServiceContext _serviceContext;

        public StateService(IMapper mapper, AppDbContext context, ServiceContext serviceContext)
        {
            this._mapper = mapper;
            this._context = context;
            this._serviceContext = serviceContext;
        }

        public async Task<List<StateViewModel>> GetStateListAsync(StateSearchRequest stateSearchRequest)
        {
            try
            {
                var query = _context.States.AsQueryable();

                if (!string.IsNullOrEmpty(stateSearchRequest.SearchText))
                {
                    query = query.Where(e => EF.Property<string>(e, "Name").Contains(stateSearchRequest.SearchText));
                }

                if (!string.IsNullOrEmpty(stateSearchRequest.SortField))
                {
                    var validSortableFields = new HashSet<string> {
                        "Name",
                    };

                    if (validSortableFields.Contains(stateSearchRequest.SortField))
                    {
                        query = _serviceContext.ApplySortingAsync(query, stateSearchRequest.SortField, stateSearchRequest.SortOrder);
                    }
                }

                return _mapper.Map<List<StateViewModel>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> AddEditStateAsync(StateAddViewModel stateAddViewModel)
        {
            try
            {
                var state = await _context.States.FindAsync(stateAddViewModel.StateId);
                if (state == null)
                {
                    state = _mapper.Map<State>(stateAddViewModel);
                    _context.States.Add(state);
                    await _context.SaveChangesAsync();

                    stateAddViewModel.StateId = state.StateId;
                }
                else
                {
                    _mapper.Map(stateAddViewModel, state);
                    _context.States.Update(state);
                    await _context.SaveChangesAsync();
                }

                return stateAddViewModel.StateId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<StateAddViewModel?> GetStateDetailsAsync(int stateId)
        {
            try
            {
                var entity = await _context.States.FirstOrDefaultAsync(x => x.StateId == stateId);

                if (entity == null)
                    return null;

                return _mapper.Map<StateAddViewModel>(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int?> DeleteStateAsync(int stateId)
        {
            try
            {
                var entity = await _context.States.FindAsync(stateId);

                if (entity == null)
                    return null;

                _context.States.Remove(entity);
                await _context.SaveChangesAsync();
                return entity.StateId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}