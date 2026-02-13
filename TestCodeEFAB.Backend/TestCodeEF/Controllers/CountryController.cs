using Microsoft.AspNetCore.Mvc;
using TestCodeEF.Domain.DTOs;
using TestCodeEF.Server.Helpers;
using TestCodeEFAB.Application.Interface;
using static TestCodeEF.Application.Common.Constants;
using static TestCodeEF.Application.Common.GlobalEnums;

namespace TestCodeEFAB.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {

        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpPost("list")]
        public async Task<ApiResponseDto> GetCountryList(CountrySearchRequest countrySearchRequest)
        {
            try
            {
                var result = await _countryService.GetCountryListAsync(countrySearchRequest);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }

        [HttpPost]
        public async Task<ApiResponseDto> CreateCountry([FromBody] CountryAddViewModel countryAddViewModel)
        {
            try
            {
                var result = await _countryService.AddEditCountryAsync(countryAddViewModel);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }

        [HttpPut]
        public async Task<ApiResponseDto> UpdateCountry([FromBody] CountryAddViewModel countryAddViewModel)
        {
            try
            {
                var result = await _countryService.AddEditCountryAsync(countryAddViewModel);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }

        [HttpGet("{countryId}")]
        public async Task<ApiResponseDto> GetCountryDetails(int countryId)
        {
            try
            {
                var result = await _countryService.GetCountryDetailsAsync(countryId);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }

        [HttpDelete("{countryId}")]
        public async Task<ApiResponseDto> DeleteCountry(int countryId)
        {
            try
            {
                var result = await _countryService.DeleteCountryAsync(countryId);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }
    }
}
