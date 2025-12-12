# app/routes/cliente_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.cliente_schema import ClienteCreate, ClienteRead
from app.configuration.database import get_db
from app.presentation.crud.cliente_crud import create_cliente, get_cliente

router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.post("/", response_model=ClienteRead, status_code=status.HTTP_201_CREATED)
def crear_cliente(cliente_in: ClienteCreate, db: Session = Depends(get_db)):
    cliente = create_cliente(db, cliente_in)
    return cliente

@router.get("/{cliente_id}", response_model=ClienteRead)
def consultar_cliente(cliente_id: int, db: Session = Depends(get_db)):
    cliente = get_cliente(db, cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente
