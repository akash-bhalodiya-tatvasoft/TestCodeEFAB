namespace TestCodeEFAB.Application.Interface
{
    public interface IStateService
    {
        Task<List<StateViewModel>> GetStateListAsync(StateSearchRequest stateSearchRequest);
        Task<int> AddEditStateAsync(StateAddViewModel stateAddViewModel);

        Task<StateAddViewModel?> GetStateDetailsAsync(int stateId);

        Task<int?> DeleteStateAsync(int stateId);


    }
}