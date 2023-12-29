from selenium import webdriver
import time
from selenium.webdriver.chrome.options import Options

def get_dynamic_source(url):
    # Set up the WebDriver for Chrome (make sure to replace 'path/to/chromedriver' with the actual path)
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(options=chrome_options)

    try:
        # Open the URL
        driver.get(url)
        time.sleep(3)

        page_source = driver.page_source

        return page_source

    finally:
        # Close the WebDriver
        driver.quit()
