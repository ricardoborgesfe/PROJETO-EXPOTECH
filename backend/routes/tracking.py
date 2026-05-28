from fastapi import APIRouter

router = APIRouter()

@router.get("/tracking")
def tracking():

    return {
        "status": "EM TRANSPORTE",
        "progress": 78
    }