
using TestCodeEF.Appplication.Common;

namespace TestCodeEFAB.Application.Interface
{
    public interface ICountryService
    {
        Task<PagedResult<CountryViewModel>> GetCountryListAsync(CountrySearchRequest countrySearchRequest);
        Task<int> AddEditCountryAsync(CountryAddViewModel countryAddViewModel);
        Task<CountryAddViewModel?> GetCountryDetailsAsync(int countryId);
        Task<int?> DeleteCountryAsync(int countryId);
        Task<List<CountryListModel>> GetCountryOptionsListAsync();

    }
}