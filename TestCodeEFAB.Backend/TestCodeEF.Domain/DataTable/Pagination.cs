//-----------------------------------------------------------------------
// <copyright file="Pagination.cs" company="TatvaSoft">
//     Copyright (c) TatvaSoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace TestCodeEF.Domain.DataTable
{
    /// <summary>
    /// This class is used to Define Pagination properties which will be used for entities
    /// </summary>
	public sealed class Pagination
    {
        public Pagination()
        {
            TotalRecords = 0;
           
        }
        #region Pagination Property

        /// <summary>
        /// Page Index
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// Page Size
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Pager Size
        /// </summary>
        public int PagerSize { get; set; }

        /// <summary>
        /// Total Pages
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Total Records
        /// </summary>
        public int TotalRecords { get; set; }

        /// <summary>
        /// Is Next Page available
        /// </summary>
        public bool HasNextPage { get; set; }

        /// <summary>
        /// Is Next Page available
        /// </summary>
        public bool HasPreviousPage { get; set; }

        #endregion

    }
}
