using AutoMapper;

namespace TestCodeEF.Domain.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Create your object-object mappings here
            CreateMap<CountryViewModel, Country>()
                .ReverseMap();

            CreateMap<CountryAddViewModel, Country>()
                .ReverseMap();

            CreateMap<State, StateViewModel>().ReverseMap();
            CreateMap<State, StateAddViewModel>().ReverseMap();
        }
    }
}
