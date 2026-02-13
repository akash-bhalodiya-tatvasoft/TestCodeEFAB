using TestCodeEF.Domain.DataTable;

public class StateSearchRequest : SearchRequestModel
{ }

public class StateViewModel
{
    public int StateId { get; set; }

    public string Name { get; set; }

    // Alias: CName (from Countries.Name)
    public string? CName { get; set; }

}
