using TestCodeEF.Domain.DataTable;

public class CountrySearchRequest : SearchWithPagination
{ }

public class CountryViewModel
{
    public int CountryId { get; set; }

    public string? Name { get; set; }

}
