using AutoMapper;

namespace TestCodeEF.Domain.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Create your object-object mappings here
            CreateMap<Country, CountryViewModel>().ReverseMap();
            CreateMap<Country, CountryAddViewModel>().ReverseMap();
        }
    }
}
