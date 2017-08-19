package com.prototype.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class HelloController {
	
	@RequestMapping(value = {"/getMessage"}, method = RequestMethod.GET)	
	public String getMessage (){
		return "Hello world from API";
	}

}
