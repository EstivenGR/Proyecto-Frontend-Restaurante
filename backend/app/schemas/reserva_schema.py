from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import date 

class ReservaCreate(BaseModel):
    cliente_id: int = Field(..., description="ID del cliente que realiza la reserva")
    mesa_id: int = Field(..., description="ID de la mesa seleccionada")
    fecha_reserva: date = Field(..., description="Fecha de la reserva")
    hora_reserva: str = Field(..., description="Hora de la reserva (formato HH:MM)")
    requerimientos: Optional[str] = None
    
class ReservaRead(BaseModel):
    model_config = ConfigDict(
        from_attributes=True, 
        json_encoders={date: lambda d: d.isoformat()}
    )

    id: int
    nombre_cliente: str = Field(..., serialization_alias="cliente_nombre") 
    numero_mesa: str = Field(..., serialization_alias="mesa_numero")
    fecha_reserva: date = Field(..., serialization_alias="start_time")
    hora_reserva: str = Field(..., description="Hora de la reserva (formato HH:MM)")
    requerimientos: Optional[str]

class ReservaBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    cliente_id: int
    mesa_id: int
    start_time: date
    hora_reserva: str
    requerimientos: Optional[str]