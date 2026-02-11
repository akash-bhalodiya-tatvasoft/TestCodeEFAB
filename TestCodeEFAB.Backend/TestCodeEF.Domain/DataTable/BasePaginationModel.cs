namespace TestCodeEF.Domain.DataTable
{
    public class SearchRequestModel
    {
        public string? SortField { get; set; }
        public string? SortOrder { get; set; }
        public string? SearchText { get; set; }
    }

    public class SearchWithPagination : SearchRequestModel
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
