using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Countries", Schema = "dbo")]
public class Country
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("CountryId")]
    public int CountryId { get; set; }

    [StringLength(100)]
    [Column("Name")]
    public string? Name { get; set; }

    [Required]
    [Column("CreatedBy")]
    public int CreatedBy { get; set; }

    [Required]
    [Column("CreatedDate")]
    public DateTime CreatedDate { get; set; }

    [Column("LastUpdatedBy")]
    public int? LastUpdatedBy { get; set; }

    [Column("LastUpdatedDate")]
    public DateTime? LastUpdatedDate { get; set; }

}
