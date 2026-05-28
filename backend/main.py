from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.optimize import router as optimize_router
from routes.products import router as products_router
from routes.tracking import router as tracking_router

app = FastAPI(
    title="MinePack Optimizer API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(optimize_router)
app.include_router(products_router)
app.include_router(tracking_router)

@app.get("/")
def home():

    return {
        "message": "MinePack Optimizer API Running"
    }