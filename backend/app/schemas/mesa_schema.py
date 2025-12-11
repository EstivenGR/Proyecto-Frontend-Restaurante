# app/schemas/mesa_schema.py
from pydantic import BaseModel
from typing import Optional

class MesaCreate(BaseModel):
    numero: str
    capacidad: int

class MesaRead(BaseModel):
    id: int
    numero: str
    capacidad: int

    class Config:
        orm_mode = True
