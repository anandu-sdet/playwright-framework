const{test:base} = require('@playwright/test')

exports.test = base.extend({

    loggedInPage:async({page},use)=>{
         console.log("➡️ Fixture setup: Logging in...");

         await page.goto("https://www.amazon.in/");
         await page.locator("//a[contains(@class,'nav-a-2')]//descendant::span[contains(@id,'accountList')]").click();
         await page.locator("//input[@id='ap_email_login']").fill("+919645862264");
         await page.locator("//span[@id='continue']//self::input").click();
         await page.locator("//input[@type='password' and @name='password']").click();
         await page.locator("//input[@type='password' and @name='password']").fill("Anandu@123");
         await page.locator("//span[contains(@class,'a-button-inner')]/child::input[@id='signInSubmit']").click();
         //await page.locator("//span[contains(@class,'inner')]//self::span[@id='auth-signin-button-announce']").click();

         await use(page);
         console.log("⬅️ Fixture teardown: Test finished");

    }
})