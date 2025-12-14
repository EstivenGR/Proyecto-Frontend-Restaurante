from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.mesa_schema import MesaCreate, MesaRead
from app.schemas.mesa_status import EstadoMesa # Importamos el Enum
from app.configuration.database import get_db
from app.presentation.crud.mesa_crud import create_mesa, list_mesas 

router = APIRouter(prefix="/mesas", tags=["mesas"])

@router.post("/", response_model=MesaRead, status_code=status.HTTP_201_CREATED)
def crear_mesa(mesa_in: MesaCreate, db: Session = Depends(get_db)):
    mesa = create_mesa(db, mesa_in)
    return mesa

@router.get("/", response_model=list[MesaRead])
def listar_mesas(
    db: Session = Depends(get_db),
    estado: Optional[EstadoMesa] = Query(None, description="Filtrar por estado ('disponible', 'reservada')")
):
    return list_mesas(db, estado=estado)