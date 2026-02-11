namespace TestCodeEF.Appplication.Common
{
    public class PagedResult<T>
    {
        public int TotalRecords { get; set; }
        public List<T> Items { get; set; } = new();
    }
}
