from scrapers.costco_scraper import CostcoScraper
from scrapers.costco_flyer_scraper import CostcoFlyerScraper
from flask import Flask, jsonify, request
from config import Config
import json

app = Flask(__name__)
app.config.from_object(Config)

print(f"Running on {app.config['FLASK_RUN_HOST']}:{app.config['FLASK_RUN_PORT']}")
# def main():
#     costco_flyer_scraper = CostcoFlyerScraper()
#     result = costco_flyer_scraper.scrape()

@app.route('/item')
def costco():
    url_param = request.args.get('itemURL')

    if not url_param:
        return jsonify({'error': 'itemURL parameter is required'})
    
    costco_scraper = CostcoScraper()
    result = costco_scraper.scrape(url_param)
    print(f"{result}")
    return jsonify(result)

@app.route('/flyer')
def flyer():
    url_param = request.args.get('flyerURL')

    if not url_param:
        return jsonify({'error': 'flyerURL parameter is required'})
    
    costco_flyer_scraper = CostcoFlyerScraper()
    result = costco_flyer_scraper.scrape(url_param)
    with open("response.log", "w+") as flier_log:
        flier_log.write(json.dumps(result, indent=2))
    return jsonify(result)

if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=app.config['FLASK_RUN_PORT'], debug=True)

