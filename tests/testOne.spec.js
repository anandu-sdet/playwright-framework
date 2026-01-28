import {expect,test} from '@playwright/test'


test('testCase ecommerce product adding',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazon.in/");
    const textWeWant = "adidas running shoes for man"
    await page.locator("//div[contains(@class,'nav-line-1-')]/descendant::span").click();
    await page.locator("//*[@type='email']").fill("9645862264");
    await page.locator("//input[contains(@type,'submit')]").click();
    await page.locator("//*[@type='password']").fill("Anandu@123");
    await page.locator("//span[contains(@class,'a-button-inner')]/child::input[@id='signInSubmit']").click();
    expect(await page.locator("//div[contains(@class,'nav-line-1')]/descendant::span")).toHaveText("Hello, Anandu");
    await page.locator("//div[contains(@class,'search')]/descendant::input[@type='text']").pressSequentially("adidas");
    await page.locator("//div[contains(@class,'s-suggestion')]/self::div[@role = 'button']").first().waitFor();
    const CountOfProducts = await page.locator("//div[contains(@class,'s-suggestion')]/self::div[@role = 'button']").count();
    console.log(CountOfProducts);
    for(let i = 0;i<CountOfProducts;i++){
        const productName =  await page.locator("//div[contains(@class,'s-suggestion')]/self::div[@role = 'gridcell']").nth(i).textContent();
        console.log(productName);
        if(productName === textWeWant){
            await page.locator("//div[contains(@class,'s-suggestion')]/self::div[@role = 'button']").nth(i).click()
            break;
        }
    }
    await page.pause();






})