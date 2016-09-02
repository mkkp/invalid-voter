package mkkp.voter.ui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mkkp.voter.constant.UrlConstants;

@Controller
public class IndexController {

    @RequestMapping(value = UrlConstants.DEFAULT, method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}