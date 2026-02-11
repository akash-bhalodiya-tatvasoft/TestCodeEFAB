using Microsoft.AspNetCore.Mvc;

namespace TestCodeEF.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {

        [HttpGet]
        public String Get()
        {
            return "API is Working";
        }
    }
}
