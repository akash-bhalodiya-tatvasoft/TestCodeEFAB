namespace TestCodeEF.Domain.DTOs
{
    public class ApiResponseDto
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public object DataObj { get; set; }

    }
}
