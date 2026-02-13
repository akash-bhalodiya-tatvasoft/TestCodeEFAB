using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("States", Schema = "dbo")]
public class State
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("StateId")]
    public int StateId { get; set; }

    [Column("CountryId")]
    public int? CountryId { get; set; }

    [ForeignKey(nameof(CountryId))]
    public Country? Country { get; set; }

    [Required]
    [StringLength(50)]
    [Column("Name")]
    public string Name { get; set; }

    [Column("CreatedBy")]
    public int? CreatedBy { get; set; }

    [Column("CreatedDate")]
    public DateTime? CreatedDate { get; set; }

    [Column("LastUpdatedBy")]
    public int? LastUpdatedBy { get; set; }

    [Column("LastUpdatedDate")]
    public DateTime? LastUpdatedDate { get; set; }

}
