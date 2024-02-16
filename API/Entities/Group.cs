using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Group
{
    [Key]
    public string Name { get; set; }
    
}