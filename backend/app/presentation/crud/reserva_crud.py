from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date
from app.model.reserva import Reserva
from app.model.cliente import Cliente 
from app.model.mesa import Mesa
from app.schemas.reserva_schema import ReservaCreate, ReservaRead
from app.presentation.crud.mesa_crud import set_mesa_status 
from app.schemas.mesa_status import EstadoMesa 


def is_mesa_available(db: Session, mesa_id: int, target_date: date, target_hour: str) -> bool:
    existing = db.query(Reserva).filter(
        Reserva.mesa_id == mesa_id,
        Reserva.start_time == target_date,
        Reserva.hora_reserva == target_hour
    ).first()
    return existing is None

def create_reserva(db: Session, reserva_in: ReservaCreate) -> Reserva:
    if not is_mesa_available(db, reserva_in.mesa_id, reserva_in.fecha_reserva, reserva_in.hora_reserva):
        raise ValueError("La mesa ya está reservada para esa fecha y hora")

    reserva_data = reserva_in.model_dump(by_alias=False)
    reserva_data['start_time'] = reserva_data.pop('fecha_reserva')
     
    reserva = Reserva(**reserva_data)
    db.add(reserva)
    db.commit()
    db.refresh(reserva)

    set_mesa_status(db, reserva_in.mesa_id, EstadoMesa.RESERVADA)
    
    return reserva

def list_reservas_by_date(db: Session, target_date: date) -> List[ReservaRead]:

    reservas_con_datos = db.query(
        Reserva.id,
        Reserva.start_time.label('fecha_reserva'),
        Reserva.hora_reserva,
        Reserva.requerimientos,
        Cliente.nombre.label('nombre_cliente'),
        Mesa.numero.label('numero_mesa')
    ).join(Cliente, Reserva.cliente_id == Cliente.id
    ).join(Mesa, Reserva.mesa_id == Mesa.id
    ).filter(
        Reserva.start_time == target_date
    ).order_by(Reserva.hora_reserva).all()
    
    return [ReservaRead.model_validate(r._asdict()) for r in reservas_con_datos]

def get_reserva(db: Session, reserva_id: int) -> Optional[Reserva]:
    return db.query(Reserva).filter(Reserva.id == reserva_id).first()

def delete_reserva(db: Session, reserva: Reserva):
    set_mesa_status(db, reserva.mesa_id, EstadoMesa.DISPONIBLE)
    db.delete(reserva)
    db.commit()