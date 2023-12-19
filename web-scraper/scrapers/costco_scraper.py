import requests
from .base_scraper import BaseScraper
from bs4 import BeautifulSoup
from drivers.firefox_driver import get_dynamic_source

class CostcoScraper(BaseScraper):
    def __init__(self):
        super().__init__("Costco")
        
    def getProductName(self, soup):
        try:
            title = soup.find("h1", attrs={"automation-id": "productName"}).text
        except:
            title = "Title not found"
        
        return title

    def getImage(self, soup):
        try:
            image = soup.find("img", id="initialProductImage").get("src")
        except:
            image = "Image not found"

        return image
    
    def getProductPrice(self, soup):
        try:
            # price = soup.find("span", attrs={"automation-id": "productPriceOutput"})
            price = soup.find("span", attrs={"automation-id": "productPriceOutput"}).text
        except:
            price = "Price not found"

        return price
    
    # def getProductDetails(self, soup):
    #     try:
    #         allDetails = soup.find("span", id="productDescriptions1")
    #         detailsRow = allDetails.find_all("strong")
    #     except:
    #         return "Details not found"

    #     itemDetails = {} 

    #     for row in detailsRow:
    #         detailName = row
    #         detailsList = row.find_next_sibling("ul")

    #         detailValue = []

    #         if detailsList:
    #             for det in detailsList.find_all("li"):
    #                 detailValue.append(det.text.strip())

    #             itemDetails[detailName.text.strip()] = detailValue
    #         else:
    #             itemDetails[detailName.text.strip()] = "No details available"

    #     return itemDetails
    
    def getProductSpecs(self, soup):
        try:
            allSpecs = soup.find("div", attrs={"class": "product-info-specs"})
            specsRow = allSpecs.find_all("div", class_="row")
        except:
            return "Specifications not found"

        itemSpecs = {} 

        for row in specsRow:
            specName = row.find("div", class_="spec-name")
            specValue = specName.find_next("div")

            itemSpecs[specName.text.strip()] = specValue.text.strip()

        return itemSpecs

    def scrape(self):
        url = "https://www.costco.ca/samsung-galaxy-tab-s9-fe%2c-10.9-in.-128gb-with-s-pen.product.4000152929.html"
        # url = "https://www.costco.ca/realtree-woman%e2%80%99s-flannel-lined-jean.product.4000138954.html?preselect=colour%3ablack"

        costcoData = {}
        source = get_dynamic_source(url)

        try:
            soup = BeautifulSoup(source, features="lxml")

            costcoData = {
                "url": url,
                "retailer": "Costco Canada",
                "title": self.getProductName(soup),
                "image": self.getImage(soup),
                "price": self.getProductPrice(soup),
                # "Details": self.getProductDetails(soup),
                "Specifications": self.getProductSpecs(soup),
            }

        finally:
            return costcoData

    