using API.Data;
using API.DTOs;
using API.Entities;
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

    public UsersController(IUserRepository context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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
}