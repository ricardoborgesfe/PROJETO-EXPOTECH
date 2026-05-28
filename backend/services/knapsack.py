def optimize_load(products, capacity):

    products = sorted(
        products,
        key=lambda x: x["priority"],
        reverse=True
    )

    selected_products = []

    current_weight = 0

    for product in products:

        if current_weight + product["weight"] <= capacity:

            selected_products.append(product)

            current_weight += product["weight"]

    efficiency = round(
        (current_weight / capacity) * 100,
        2
    )

    return {
        "selected_products": selected_products,
        "used_capacity": current_weight,
        "efficiency": efficiency
    }