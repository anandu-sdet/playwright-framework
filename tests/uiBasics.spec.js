import {test,expect} from '@playwright/test'

test.only("first playwright test",async ({browser})=>{

    const context = await browser.newContext();
    const page  = await context.newPage();
    let productName = "iphone 16 128"
    await page.goto("https://www.amazon.in/");
    await page.locator("//div[@class='nav-line-1-container']/child::span").click();
    await page.locator("//input[@type='email']").fill("9645862264");
    await page.locator("//span[@id='continue']/descendant::input").click();
    await page.locator("//div[@class='a-section a-spacing-large']/child::input").fill("Anandu@123");
    await page.locator("//span[@class='a-button-inner']/descendant-or-self::input[@id='signInSubmit']").click();
    
    await page.locator("//label[contains(text(), 'Search Amazon.in')]/following-sibling::input").pressSequentially("iphone 16")
   await page.locator("//div[contains(@class,'two-pane')]/child::div[contains(@class,'left-pane')]").first().waitFor();
   const productDetails = await page.locator("//div[contains(@class,'two-pane')]/child::div[contains(@class,'left-pane')]")
    const countOfProductDropDown = await productDetails.locator("//div[@role='row']").count();
    console.log(countOfProductDropDown);
    for(let i =0; i<countOfProductDropDown ; i++){
       const productDetailsInDropDown =  await productDetails.locator("//div[@role='row']").nth(i).textContent();
       if(productDetailsInDropDown === "iphone 16 128gb"){
        await productDetails.locator("//div[@role='row']").nth(i).click();
        break;
       }
    }
    

    await expect(page.locator("//div[contains(@class, 'a-spacing-small')]/following::a[contains(@class,'s-line-clamp-2')]").first()).toHaveText("iPhone 16 128 GB: 5G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Black")
    await page.locator("//div[contains(@class,'puisg-row')]//descendant-or-self::button[contains(@id,'a-autoid-1-announce')]").click();
    await page.locator("//div[contains(@id,'nav-cart-text-container')]").click();

await expect(page.locator("//span[contains(@class,'a-size-base-plus')]/descendant::span[contains(text(),'5G Mobile Phone with Camera Control')]").first()).toHaveText("iPhone 16 128 GB: 5G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Black")
await page.locator("//form[@id='gutterCartViewForm']//input[contains(@class,'a-button-input')]").click();
await page.pause();

   
});

test("sortingProducts",async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.amazon.in/");
    await page.locator("//div[contains(@class,'1-container')]//descendant-or-self::span").click();

    await page.locator("//div[@id='claim-input-container']/descendant-or-self::input").fill("+919645862264");
    await page.locator("//span[@id='continue']/descendant-or-self::input").click();
    await page.locator("//div[contains(@class,'a-spacing-large')]/descendant::input").fill("Anandu@123");
    await page.locator("//span[@class='a-button-inner']/descendant-or-self::input[@id='signInSubmit']").click();
    await page.locator("//div[contains(@class,'-search-field ')]/child::input").pressSequentially("Samsung S25");
    await page.locator("//div[contains(@class,'left-pane-results')]/child::*").first().waitFor();
    const products = await page.locator("//div[contains(@class,'left-pane-results')]/child::*").allTextContents();

   console.log(products);
   function arrangeProduct(products){

    let n = products.length;
    let swapped;
    do{
        swapped = false;
        for(let i = 0; i<n-1 ; i++){
            if(products[i]>products[i+1]){
                let temp = products[i];
                products[i] = products[i+1];
                products[i+1] = temp;
                swapped = true;

            }
        }
        n--
    }while(swapped);
    return products;
   }
   const sortedProducts = arrangeProduct(products);
    console.log("After sorting:", sortedProducts);

    await page.pause();





















})