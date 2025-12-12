# app/crud/cliente_crud.py
from sqlalchemy.orm import Session
from app.model.cliente import Cliente
from app.schemas.cliente_schema import ClienteCreate

def create_cliente(db: Session, cliente_in: ClienteCreate) -> Cliente:
    cliente = Cliente(**cliente_in.dict())
    db.add(cliente)
    db.commit()
    db.refresh(cliente)
    return cliente

def get_cliente(db: Session, cliente_id: int):
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()
