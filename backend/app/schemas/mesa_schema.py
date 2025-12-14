# app/schemas/mesa_schema.py (SOLUCIÓN - RENOMBRAR)

from pydantic import BaseModel, Field
from typing import Optional
from .mesa_status import EstadoMesa 

class MesaBase(BaseModel):
    # ... (código MesaBase, MesaCreate, MesaUpdate sin cambios) ...
    numero: str = Field(..., max_length=10)
    capacidad: int = Field(..., gt=0)
    estado: Optional[EstadoMesa] = Field(default=EstadoMesa.DISPONIBLE) 

class MesaCreate(MesaBase):
    pass

class MesaUpdate(MesaBase):
    numero: Optional[str] = None
    capacidad: Optional[int] = None
    estado: Optional[EstadoMesa] = None


class MesaRead(MesaBase):
    id: int
    
    class Config:
        from_attributes = True