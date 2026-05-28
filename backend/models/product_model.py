from pydantic import BaseModel

class Product(BaseModel):

    id: int
    title: str
    weight: int
    priority: int