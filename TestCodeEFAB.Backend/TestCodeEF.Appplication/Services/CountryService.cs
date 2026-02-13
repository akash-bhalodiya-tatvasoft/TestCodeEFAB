using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TestCodeEF.Application;
using TestCodeEF.Appplication.Common;
using TestCodeEF.Infrastructure.Data;

namespace TestCodeEFAB.Application.Interface
{
    public class CountryService : ICountryService
    {

        // This dependency injection code is auto-generated.
        // Please review and update it according to your project's architecture and structure.
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly ServiceContext _serviceContext;

        public CountryService(IMapper mapper, AppDbContext context, ServiceContext serviceContext)
        {
            this._mapper = mapper;
            this._context = context;
            this._serviceContext = serviceContext;
        }

        public async Task<PagedResult<CountryViewModel>> GetCountryListAsync(CountrySearchRequest countrySearchRequest)
        {
            try
            {
                var query = _context.Countries.AsQueryable();

                if (!string.IsNullOrEmpty(countrySearchRequest.SearchText))
                {
                    query = query.Where(e => EF.Property<string>(e, "Name").Contains(countrySearchRequest.SearchText));
                }

                if (!string.IsNullOrEmpty(countrySearchRequest.SortField))
                {
                    var validSortableFields = new HashSet<string> {
                        "Name",
                    };

                    if (validSortableFields.Contains(countrySearchRequest.SortField))
                    {
                        query = _serviceContext.ApplySortingAsync(query, countrySearchRequest.SortField, countrySearchRequest.SortOrder);
                    }
                }

                if (countrySearchRequest.PageIndex >= 0)
                    _serviceContext.PagingInformation.PageIndex = countrySearchRequest.PageIndex;

                if (countrySearchRequest.PageSize > 0)
                    _serviceContext.PagingInformation.PageSize = countrySearchRequest.PageSize;

                var data = await _serviceContext.ApplyPaginationAsync(query);

                return new PagedResult<CountryViewModel>()
                {
                    Items = _mapper.Map<List<CountryViewModel>>(data.Items),
                    TotalRecords = data.TotalRecords,
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> AddEditCountryAsync(CountryAddViewModel countryAddViewModel)
        {
            try
            {
                var country = await _context.Countries.FindAsync(countryAddViewModel.CountryId);
                if (country == null)
                {
                    country = _mapper.Map<Country>(countryAddViewModel);
                    _context.Countries.Add(country);
                    await _context.SaveChangesAsync();

                    countryAddViewModel.CountryId = country.CountryId;
                }
                else
                {
                    _mapper.Map(countryAddViewModel, country);
                    _context.Countries.Update(country);
                    await _context.SaveChangesAsync();
                }

                return countryAddViewModel.CountryId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CountryAddViewModel?> GetCountryDetailsAsync(int countryId)
        {
            try
            {
                var entity = await _context.Countries.FirstOrDefaultAsync(x => x.CountryId == countryId);

                if (entity == null)
                    return null;

                return _mapper.Map<CountryAddViewModel>(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int?> DeleteCountryAsync(int countryId)
        {
            try
            {
                var entity = await _context.Countries.FindAsync(countryId);

                if (entity == null)
                    return null;

                _context.Countries.Remove(entity);
                await _context.SaveChangesAsync();
                return entity.CountryId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<CountryListModel>> GetCountryOptionsListAsync()
        {
            try
            {
                return await _context.Countries
                        .Select(x => new CountryListModel
                        {
                            CountryId = x.CountryId,
                            Name = x.Name
                        }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}