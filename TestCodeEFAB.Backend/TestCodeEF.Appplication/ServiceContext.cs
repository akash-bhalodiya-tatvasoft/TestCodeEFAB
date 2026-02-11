using TestCodeEF.Domain.DataTable;
using TestCodeEF.Appplication.Common;
using Microsoft.EntityFrameworkCore;


namespace TestCodeEF.Application
{
    public class ServiceContext
    {
        public Pagination PagingInformation { get; }
        public const int DefaultPageIndex = 0;
        public const int DefaultPageSize = 10;

        public ServiceContext()
        {
            PagingInformation = new Pagination() { PageIndex = DefaultPageIndex, PageSize = DefaultPageSize };
        }

        public int StartRowIndex()
        {
            if (PagingInformation.PageIndex >= 0 && PagingInformation.PageSize > 0)
            {
                return PagingInformation.PageIndex * PagingInformation.PageSize + 1;
            }
            return 0;
        }

        public IQueryable<T> ApplySortingAsync<T>(IQueryable<T> query, string sortExpression, string sortDirection)
        {
            sortDirection = string.IsNullOrEmpty(sortDirection) ? "desc" : sortDirection;

            return string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase)
                ? query.OrderByDescending(e => EF.Property<object>(e, sortExpression))
                : query.OrderBy(e => EF.Property<object>(e, sortExpression));
        }

        public async Task<PagedResult<T>> ApplyPaginationAsync<T>(IQueryable<T> query)
        {
            int startIndex = StartRowIndex();
            if (PagingInformation.PageIndex == -1) // set -1 to get all records
            {
                var allItems = await query.ToListAsync();

                return new PagedResult<T>
                {
                    Items = allItems,
                    TotalRecords = allItems.Count
                };
            }

            int totalRecords = await query.CountAsync();

            int start = startIndex is > 0 ? startIndex : DefaultPageIndex + 1;
            int size = PagingInformation.PageSize is >= 0 ? PagingInformation.PageSize : DefaultPageSize;

            var items = await query
                .Skip(start - 1)
                .Take(size)
                .ToListAsync();

            return new PagedResult<T>
            {
                Items = items,
                TotalRecords = totalRecords,
            };
        }

    }
}
