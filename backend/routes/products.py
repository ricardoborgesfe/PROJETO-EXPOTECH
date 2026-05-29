from fastapi import APIRouter
from services.knapsack import optimize_load

router = APIRouter()

@router.post("/optimize")
def optimize(data: dict):

    products = data["products"]
    capacity = data["capacity"]

    result = optimize_load(
        products,
        capacity
    )

    return result