from .base_scraper import BaseScraper
from bs4 import BeautifulSoup
from drivers.firefox_driver import get_dynamic_source
from datetime import date
import os

class CostcoFlyerScraper(BaseScraper):
    def __init__(self):
        super().__init__("Costco")

    def getURL(self, soup):
        try:
            url_tag = soup.find("a", href=True)

            if url_tag:
                return url_tag.get("href")
            else:
                return "url not found"
        except:
            return "url not found"
        
    def getProductName(self, soup):
        try:
            title_tag = soup.find("span", class_="spanBlock sl1")

            if title_tag:
                return title_tag.text.strip()
            else:
                return "Title not found"
        except:
            return "Title not found"

    def getImage(self, soup):
        try:
            img_tag = soup.find("img", src=True)
            if img_tag:
                return img_tag.get("src")
            else:
                return "Image not found"
        except:
            return "Image not found"
    
    def getProductPrice(self, soup):
        try:
            price_tag = soup.find("span", class_="eco-priceTable")

            if price_tag:
                price_text = price_tag.text.strip()
                numeric_price = float(price_text.replace('$', '').replace(',', ''))
                return numeric_price
            else:
                return "Price not found"
        except Exception as e:
            print(f"Error extracting price: {str(e)}")
            return "Error extracting price"


    def scrape(self, url):
        costcoData = []
        retailer = "Costco Canada"
        log_file_path = f'./flyers/{retailer.replace(" ", "_")}_flyers_{date.today()}.txt'

        try:
            if os.path.exists(log_file_path):
                with open(log_file_path, 'r') as log_file:
                    source = log_file.read()
            else:
                source = get_dynamic_source(url)

            soup = BeautifulSoup(source, features="lxml")

            item_array = soup.find_all("li", class_="couponbox")

            if not os.path.exists(log_file_path):
                item_array_str = '\n'.join(str(item) for item in item_array)

                with open(log_file_path, "w+") as flier_log:
                    flier_log.write(item_array_str)

            if item_array:
                for item in item_array:
                    url = self.getURL(item)
                    price = self.getProductPrice(item)

                    # if url is None or url == "url not found":
                    #     continue

                    if price is None or price == "Price not found":
                        continue

                    costcoData.append({
                        "url": str(url),
                        "retailer": str(retailer),
                        "title": str(self.getProductName(item)),
                        "image": str(self.getImage(item)),
                        "price": price,
                        "specifications": None,
                    })

        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return []
        finally:
            return costcoData
        