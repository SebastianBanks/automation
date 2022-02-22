const {Builder, Capabilities, By}  = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

// test('add a movie', async () => {
//     const searchTerm = "Tenet"
//     const inputField = await driver.findElement(By.xpath('//input'))
//     await inputField.sendKeys('Tenet')
    
//     const movieButton = await driver.findElement(By.css('button'))
//     await movieButton.click()
   

//     const theResult = await driver.findElement(By.xpath('//li/span')).getText()
//     expect(theResult).toBe(searchTerm)
    
// })

test('cross off movie', async () => {
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Tenet')
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()

    const movie = await driver.findElement(By.xpath("//span"))
    let isChecked = false
    console.log(movie.getAttribute("class"))
    
    await driver.sleep(1000)
    await movie.click()
    await driver.sleep(1000)
    if (await movie.getAttribute("class") === "checked") {
        isChecked = true
    }
    driver.sleep(1000)
    expect(isChecked).toBe(true)
})

test('notification displayed', async () => {
    const movie = await driver.findElement(By.xpath("//span"))
    const alert = await driver.findElement(By.xpath("//aside"))
    let isNotified = false
    
    await driver.sleep(1000)
    await movie.click()
    if (await alert.getAttribute("class") !== "hide") {
        isNotified = true
    }
    driver.sleep(3000)
    expect(isNotified).toBe(true)
})

test('delete a movie', async () => {
    const deleteBtn = await driver.findElement(By.xpath('//li/button'))
    const alert = await driver.findElement(By.xpath("//aside"))
    let isDeleted = false
    await deleteBtn.click()
    if (await alert.getAttribute('class') !== "hide") {
        isDeleted = true
    }
    expect(isDeleted).toBe(true)

})

