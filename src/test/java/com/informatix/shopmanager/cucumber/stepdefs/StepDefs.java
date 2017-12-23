package com.informatix.shopmanager.cucumber.stepdefs;

import com.informatix.shopmanager.ShopManagerApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ShopManagerApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
