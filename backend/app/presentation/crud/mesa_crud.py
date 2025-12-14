from sqlalchemy.orm import Session
from typing import Optional, List
from app.model.mesa import Mesa
from app.schemas.mesa_schema import MesaCreate
from app.schemas.mesa_status import EstadoMesa 


def create_mesa(db: Session, mesa_in: MesaCreate) -> Mesa:
    mesa = Mesa(**mesa_in.model_dump()) 
    db.add(mesa)
    db.commit()
    db.refresh(mesa)
    return mesa

def get_mesa(db: Session, mesa_id: int):
    return db.query(Mesa).filter(Mesa.id == mesa_id).first()

def list_mesas(db: Session, estado: Optional[EstadoMesa] = None) -> List[Mesa]:

    query = db.query(Mesa)
    
    if estado:
        query = query.filter(Mesa.estado == estado)
        
    return query.order_by(Mesa.numero).all()

def set_mesa_status(db: Session, mesa_id: int, nuevo_estado: EstadoMesa) -> Optional[Mesa]:
   
    mesa = get_mesa(db, mesa_id)
    if mesa:
        mesa.estado = nuevo_estado
        db.add(mesa)
        db.commit()
        db.refresh(mesa)
        return mesa
    return None