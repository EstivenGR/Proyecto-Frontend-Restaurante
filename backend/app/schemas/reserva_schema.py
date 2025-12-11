# app/schemas/reserva_schema.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReservaCreate(BaseModel):
    cliente_id: int
    mesa_id: int
    start_time: datetime = Field(..., description="Fecha y hora en formato ISO 8601")
    requerimientos: Optional[str] = None

class ReservaRead(BaseModel):
    id: int
    cliente_id: int
    mesa_id: int
    start_time: datetime
    requerimientos: Optional[str]

    class Config:
        orm_mode = True
