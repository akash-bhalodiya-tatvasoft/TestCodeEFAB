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
    public class StateController : ControllerBase
    {

        // API Route should be (api/[controller])

        // This dependency injection code is auto-generated.
        // Please review and update it according to your project's architecture and structure.
        private readonly IStateService _stateService;

        public StateController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpPost("list")]
        public async Task<ApiResponseDto> GetStateList(StateSearchRequest stateSearchRequest)
        {
            try
            {
                var result = await _stateService.GetStateListAsync(stateSearchRequest);
                return CommonHelper.getResponse(ApiResultStatusCode.Success, Messages.Success, result);
            }
            catch (Exception ex)
            {
                return CommonHelper.getResponse(ApiResultStatusCode.Error, ex.Message, null);
            }
        }


    }
}
