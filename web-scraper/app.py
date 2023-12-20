from scrapers.costco_scraper import CostcoScraper
from flask import Flask, jsonify, request
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

print(f"Running on {app.config['FLASK_RUN_HOST']}:{app.config['FLASK_RUN_PORT']}")

# def main():
#     costco_scraper = CostcoScraper()
#     result = costco_scraper.scrape()

@app.route('/')
def home():
    url_param = request.args.get('url')

    if not url_param:
        return jsonify({'error': 'URL parameter is required'})
    
    costco_scraper = CostcoScraper()
    result = costco_scraper.scrape(url_param)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
