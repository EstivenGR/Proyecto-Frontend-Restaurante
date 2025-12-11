# app/crud/mesa_crud.py
from sqlalchemy.orm import Session
from app.model.mesa import Mesa
from app.schemas.mesa_schema import MesaCreate

def create_mesa(db: Session, mesa_in: MesaCreate) -> Mesa:
    mesa = Mesa(**mesa_in.dict())
    db.add(mesa)
    db.commit()
    db.refresh(mesa)
    return mesa

def list_mesas(db: Session):
    return db.query(Mesa).order_by(Mesa.numero).all()

def get_mesa(db: Session, mesa_id: int):
    return db.query(Mesa).filter(Mesa.id == mesa_id).first()
