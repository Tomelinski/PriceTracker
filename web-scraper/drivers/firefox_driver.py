from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.options import Options

def get_dynamic_source(url):
    # Set up the WebDriver (make sure to replace 'path/to/chromedriver' with the actual path)
    # driver = webdriver.Chrome(executable_path='path/to/chromedriver')
    firefox_options = Options()
    firefox_options.add_argument('--headless')
    driver = webdriver.Firefox(options=firefox_options)

    try:
        # Open the URL
        driver.get(url)
        time.sleep(2)

        page_source = driver.page_source

        return page_source

    finally:
        # Close the WebDriver
        driver.quit()

