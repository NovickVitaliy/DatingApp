using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extension;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _context;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository context, IMapper mapper, IPhotoService photoService)
    {
        _context = context;
        _mapper = mapper;
        _photoService = photoService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _context.GetMembersAsync();
        return Ok(users);

    }
    
    [HttpGet]
    [Route("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
         var user = await _context.GetUserByUsernameAsync(username);

         var userToReturn = _mapper.Map<MemberDto>(user);
         return Ok(userToReturn);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.GetUsername();

        var user = await _context.GetUserByUsernameAsync(username);

        if (user == null)
        {
            return NotFound();
        }

        _mapper.Map(memberUpdateDto, user);

        if (await _context.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }


    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _context.GetUserByUsernameAsync(User.GetUsername());

        if (user == null)
        {
            return NotFound();
        }

        var result = await _photoService.AddPhotoAsync(file);

        if (result.Error != null)
        {
            return BadRequest(result.Error.Message);
        }

        var photo = new Photo()
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (user.Photos.Count == 0) photo.IsMain = true;

        user.Photos.Add(photo);

        if (await _context.SaveAllAsync())
        {
            return CreatedAtAction(nameof(GetUser),
                new { username = user.UserName },
                _mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await _context.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return NotFound();

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("This is already your main photo");

        var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMainPhoto != null) currentMainPhoto.IsMain = false;

        photo.IsMain = true;

        if (await _context.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var user = await _context.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null)
        {
            return NotFound();
        }

        if (photo.IsMain)
        {
            return BadRequest("You cannot delete your main photo");
        }

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }
        }

        user.Photos.Remove(photo);

        if (await _context.SaveAllAsync())
        {
            return Ok();
        }

        return BadRequest("Problem deletin photo");
    }
    
}