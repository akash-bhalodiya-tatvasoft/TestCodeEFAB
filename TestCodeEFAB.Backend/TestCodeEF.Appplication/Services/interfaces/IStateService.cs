namespace TestCodeEFAB.Application.Interface
{
    public interface IStateService
    {
        Task<List<StateViewModel>> GetStateListAsync(StateSearchRequest stateSearchRequest);
    }
}