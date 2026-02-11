using TestCodeEF.Domain.DTOs;
using static TestCodeEF.Application.Common.GlobalEnums;

namespace TestCodeEF.Server.Helpers
{
    public static class CommonHelper
    {
        public static ApiResponseDto getResponse(ApiResultStatusCode statusCode, string message, object? data = null)
        {
            return new ApiResponseDto()
            {
                StatusCode = (int)statusCode,
                Message = message,
                Data = data
            };
        }
    }
}
