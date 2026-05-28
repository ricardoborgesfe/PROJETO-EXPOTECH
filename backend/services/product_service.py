import requests

FAKE_STORE_API = "https://fakestoreapi.com/products"

def fetch_products():

    response = requests.get(FAKE_STORE_API)

    products = response.json()

    formatted_products = []

    for product in products:

        formatted_products.append({
            "id": product["id"],
            "title": product["title"],
            "image": product["image"],
            "weight": 5,
            "priority": 5
        })

    return formatted_products