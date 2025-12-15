from pydantic import BaseModel, EmailStr
from typing import Optional

class ClienteCreate(BaseModel):
    nombre: str
    cedula: str
    telefono: Optional[str] = None
    email: Optional[EmailStr] = None

class ClienteRead(BaseModel):
    id: int
    nombre: str
    cedula: str
    telefono: Optional[str]
    email: Optional[EmailStr]

    class Config:
        orm_mode = True
