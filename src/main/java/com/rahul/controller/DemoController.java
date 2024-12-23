package com.rahul.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import com.rahul.model.Course;
import com.rahul.service.CourseService;
import java.util.List;

@Controller
public class DemoController {
	@Autowired
    private CourseService service;
    @Autowired
    private CourseService courseService;
	@GetMapping({ "/", "/index" })
	public String Home() {
		return "index";
	}
	@GetMapping("/courses")
	public String showCourses(Model model) {
		List<Course> pendingCourses = courseService.getPendingCourse();
		List<Course> approvedCourses = courseService.getApprovedCourses();
		List<Course> rejectedCourses = courseService.getRejectedCourses();
	
		model.addAttribute("pendingCourses", pendingCourses);
		model.addAttribute("approvedCourses", approvedCourses);
		model.addAttribute("rejectedCourses", rejectedCourses);
	
		return "courses"; // Name of the Thymeleaf template
	}

	@GetMapping("/pricing")
	public String pricing() {
		return "pricing";
	}

	@GetMapping("/about")
	public String about() {
		return "about";
	}

	@GetMapping("/events")
	public String events() {
		return "events";
	}

	@GetMapping("/trainers")
	public String trainers() {
		return "trainers";
	}

	@GetMapping("/contact")
	public String contact() {
		return "contact";
	}

	@GetMapping("/course-details")
	public String coursedetails() {
		return "course-details"; // This should resolve to course-details.html in templates
	}

}
