class BaseScraper:
    def __init__(self, name):
        self.name = name
    
    def scrape(self):
        raise NotImplementedError("scraper method must be implemented in the child class")