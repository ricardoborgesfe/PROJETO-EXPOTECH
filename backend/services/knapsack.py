def optimize_load(products, capacity):
    """
    Bounded Knapsack via DP.

    Each product has:
      - weight  : unit weight
      - priority: unit value
      - qty     : max units available (1-3)

    The algorithm chooses how many units of each product to load (0..qty)
    to maximise total priority without exceeding capacity.

    Returns each selected product with a `chosen_qty` field added,
    and the unit weight so the frontend can show weight × qty.
    """
    n = len(products)
    if n == 0 or capacity <= 0:
        return {"selected_products": [], "used_capacity": 0, "efficiency": 0, "total_priority": 0}

    cap = int(capacity)

    # dp[i][c] = max priority using first i product-types with capacity c
    dp = [[0] * (cap + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        p   = products[i - 1]
        w   = int(p["weight"])
        v   = int(p["priority"])
        qty = int(p.get("qty", 1))

        for c in range(cap + 1):
            best = dp[i - 1][c]          # take 0 units
            for k in range(1, qty + 1):  # take k units
                if k * w > c:
                    break
                candidate = dp[i - 1][c - k * w] + k * v
                if candidate > best:
                    best = candidate
            dp[i][c] = best

    # --- Backtrack to find chosen quantities ---
    selected = []
    c = cap
    for i in range(n, 0, -1):
        p   = products[i - 1]
        w   = int(p["weight"])
        v   = int(p["priority"])
        qty = int(p.get("qty", 1))

        chosen = 0
        for k in range(1, qty + 1):
            if k * w > c:
                break
            if dp[i][c] == dp[i - 1][c - k * w] + k * v:
                chosen = k   # keep searching for higher k that also matches
        # pick highest valid k
        for k in range(qty, 0, -1):
            if k * w <= c and dp[i][c] == dp[i - 1][c - k * w] + k * v:
                chosen = k
                break

        if chosen > 0:
            item = dict(p)           # preserve all fields (id, title, image…)
            item["chosen_qty"] = chosen
            selected.append(item)
            c -= chosen * w

    selected.reverse()

    used       = sum(int(p["weight"]) * int(p["chosen_qty"]) for p in selected)
    efficiency = round((used / cap) * 100, 2) if cap > 0 else 0
    total_pri  = sum(int(p["priority"]) * int(p["chosen_qty"]) for p in selected)

    return {
        "selected_products": selected,
        "used_capacity":     used,
        "efficiency":        efficiency,
        "total_priority":    total_pri,
    }