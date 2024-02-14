from .base_scraper import BaseScraper
from bs4 import BeautifulSoup
from drivers.firefox_driver import get_dynamic_source
from datetime import datetime, date
import json
import os
import logging

logging.basicConfig(filename='./error_logs/error.log', level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

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

                original_price = float(original_price_text.replace('$', '').replace(',', ''))
                current_price = float(current_price_text.replace('$', '').replace(',', ''))

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
        
    def get_latest_log_file(self, folder_path):
        try:
            files = os.listdir(folder_path)

            if files:
                return files[-1] 
            else:
                return None
        except Exception as e:
            print(f"Error: {str(e)}")
            return None
        
    def get_log_file_source(self): 
        log_file_name = self.get_latest_log_file('./flyers/')

        if log_file_name:
            raw_file_name = os.path.splitext(log_file_name)[0]
            date_str = raw_file_name.split("_")[-1]

            log_file_date = datetime.strptime(date_str, "%Y-%m-%d").date()

            today = date.today()

            if (log_file_date >= today):
                return log_file_name
            
        return ''
    
    def save_new_log(self, soup, item_array, retailer):
        dates_tags = soup.find("span", class_="CLP-validdates")

        if dates_tags:
            time_elements = dates_tags.find_all("time")

            end_date_log = time_elements[1]["datetime"] 
            log_file_path = f'./flyers/{retailer.replace(" ", "_")}_flyers_{end_date_log}.txt'
            item_array_str = '\n'.join(str(item) for item in item_array)

            with open(log_file_path, "w+") as flyer_log:
                flyer_log.write(item_array_str)

    def scrape(self, url):
        costcoData = []
        retailer = "Costco Canada"
        log_file_path = f'./flyers/{self.get_log_file_source()}'

        try:
            print(f'File: {log_file_path} & file exists {os.path.exists(log_file_path)}')
            if os.path.exists(log_file_path):
                with open(log_file_path, 'r') as log_file:
                    source = log_file.read()
            else:
                source = get_dynamic_source(url)

            soup = BeautifulSoup(source, features="lxml")

            item_array = soup.find_all("li", class_="couponbox")

            if item_array:
                if not os.path.exists(log_file_path):
                    self.save_new_log(soup, item_array, retailer)

                for item in item_array:
                    url = self.getURL(item)
                    price_info = self.getProductPrice(item)

                    if "error" in price_info:
                        continue 

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
            # error_file_path = f'./error_logs/error_log_{date.today()}.log'
            # with open(error_file_path, "w+") as error_log:
            #     error_log.write(json.dumps(str(e), indent=2))
            logging.error(f"An error occurred: {str(e)}", exc_info=True)
            # return []
        
        return costcoData
        