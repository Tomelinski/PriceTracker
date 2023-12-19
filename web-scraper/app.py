from scrapers.costco_scraper import CostcoScraper
from flask import Flask, jsonify
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

print(f"Running on {app.config['FLASK_RUN_HOST']}:{app.config['FLASK_RUN_PORT']}")

# def main():
#     costco_scraper = CostcoScraper()
#     result = costco_scraper.scrape()

@app.route('/')
def home():
    costco_scraper = CostcoScraper()
    result = costco_scraper.scrape()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
