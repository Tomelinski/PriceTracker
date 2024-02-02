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
            price_tags = soup.find_all("span", class_="eco-priceTable")

            if len(price_tags) >= 2:
                original_price_text = price_tags[0].text.strip()
                current_price_text = price_tags[2].text.strip()

                # Process prices
                original_price = float(original_price_text.replace('$', '').replace(',', ''))
                current_price = float(current_price_text.replace('$', '').replace(',', ''))

                # Return a dictionary with original and current prices
                return {"original_price": original_price, "current_price": current_price}
            else:
                return {"error": "Price not found"}
        except Exception as e:
            print(f"Error extracting price: {str(e)}")
            return {"error": "Error extracting price"}
        
    def getFlyerDates(self, soup):
        try:
            dates_tags = soup.find("span", class_="CLP-validdates")

            if dates_tags:
                time_elements = dates_tags.find_all("time")

                date1 = time_elements[0]["datetime"]
                date2 = time_elements[1]["datetime"]

                return {"startDate": date1, "endDate": date2}
            else:
                return {"error": "Dates not found"}
        except Exception as e:
            print(f"Error extracting dates: {str(e)}")
            return {"error": "Error extracting dates"}

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
                    price_info = self.getProductPrice(item)

                    if "error" in price_info:
                        continue  # Skip processing this item if there was an error extracting the price

                    original_price = price_info.get("original_price")
                    current_price = price_info.get("current_price")

                    costcoData.append({
                        "url": str(url),
                        "retailer": str(retailer),
                        "flyerDates": self.getFlyerDates(item),
                        "title": str(self.getProductName(item)),
                        "image": str(self.getImage(item)),
                        "originalPrice": original_price,
                        "price": current_price,
                        "specifications": None,
                    })

        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return []
        finally:
            return costcoData
        