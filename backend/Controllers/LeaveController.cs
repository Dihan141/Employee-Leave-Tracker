using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTOs.Leave;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveService _leaveService;

        public LeaveController(ILeaveService leaveService)
        {
            _leaveService = leaveService;
        }

        // Employee: apply leave
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ApplyLeave(CreateLeaveDto dto)
        {
            try
            {
                int employeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                await _leaveService.ApplyLeave(employeeId, dto);

                return Ok(new { message = "Leave request submitted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Employee: see own leaves
        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> MyLeaves()
        {
            try
            {
                int employeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                var leaves = await _leaveService.GetEmployeeLeaves(employeeId);

                return Ok(leaves);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Admin: see all leave requests
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllLeaves()
        {
            try
            {
                var leaves = await _leaveService.GetAllLeaves();

                return Ok(leaves);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // Admin: approve leave
        [Authorize(Roles = "admin")]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveLeave(int id)
        {
            try
            {
                await _leaveService.ApproveLeave(id);

                return Ok(new { message = "Leave approved" });
            }
            catch (Exception ex)
            {
                if (ex.Message == "Leave not found")
                    return NotFound(new { message = ex.Message });

                return BadRequest(new { message = ex.Message });
            }
        }

        // Admin: reject leave
        [Authorize(Roles = "admin")]
        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectLeave(int id)
        {
            try
            {
                await _leaveService.RejectLeave(id);

                return Ok(new { message = "Leave rejected" });
            }
            catch (Exception ex)
            {
                if (ex.Message == "Leave not found")
                    return NotFound(new { message = ex.Message });

                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> CancelLeave(int id)
        {
            try
            {
                int employeeId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                await _leaveService.CancelLeave(id, employeeId);

                return Ok(new { message = "Leave cancelled" });
            }
            catch (Exception ex)
            {
                if (ex.Message == "Leave not found")
                    return NotFound(new { message = ex.Message });

                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("current")]
        public async Task<IActionResult> GetEmployeesCurrentlyOnLeave()
        {
            try
            {
                var employeesOnLeave = await _leaveService.GetEmployeesCurrentlyOnLeave();
                return Ok(employeesOnLeave);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}