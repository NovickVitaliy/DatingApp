using API.DTOs;
using API.Entities;
using API.Extension;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(x => x.PhotoUrl, 
                opt => opt.MapFrom(
                    src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(x => x.Age, 
                opt => opt.MapFrom(
                    src => src.DateOfBirth.CalculateAge()));
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();
        CreateMap<RegisterDTO, AppUser>();

        CreateMap<Message, MessageDto>()
            .ForMember(dto => dto.SenderPhotoUrl, opt =>
                opt.MapFrom(s => s.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dto => dto.RecipientPhotoUrl, opt =>
                opt.MapFrom(s => s.Recipient.Photos.FirstOrDefault(x=>x.IsMain).Url));
        
        
    }
}