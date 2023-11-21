namespace API.Extension;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var age = today.Year - dateOfBirth.Year;

        if (dateOfBirth > today.AddDays(-age)) age--;

        return age;
    }
}