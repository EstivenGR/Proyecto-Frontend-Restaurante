# app/crud/reserva_crud.py
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.model.reserva import Reserva
from app.schemas.reserva_schema import ReservaCreate
from datetime import date, datetime, timedelta

def is_mesa_available(db: Session, mesa_id: int, start_time: datetime) -> bool:
    # Revisa si ya existe una reserva exacta para la misma mesa y hora
    existing = db.query(Reserva).filter(
        Reserva.mesa_id == mesa_id,
        Reserva.start_time == start_time
    ).first()
    return existing is None

def create_reserva(db: Session, reserva_in: ReservaCreate) -> Reserva:
    # validación en aplicación: disponibilidad
    if not is_mesa_available(db, reserva_in.mesa_id, reserva_in.start_time):
        raise ValueError("La mesa ya está reservada para esa fecha/hora")

    reserva = Reserva(**reserva_in.dict())
    db.add(reserva)
    db.commit()
    db.refresh(reserva)
    return reserva

def list_reservas_del_dia(db: Session, target_date: date):
    # Devuelve todas las reservas cuyo start_time esté en la fecha target_date
    start_dt = datetime.combine(target_date, datetime.min.time())
    end_dt = datetime.combine(target_date, datetime.max.time())
    return db.query(Reserva).filter(
        Reserva.start_time >= start_dt,
        Reserva.start_time <= end_dt
    ).order_by(Reserva.start_time).all()

def get_reserva(db: Session, reserva_id: int):
    return db.query(Reserva).filter(Reserva.id == reserva_id).first()
