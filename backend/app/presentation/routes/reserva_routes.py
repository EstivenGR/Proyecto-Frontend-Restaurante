# app/routes/reserva_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date
from app.schemas.reserva_schema import ReservaCreate, ReservaRead
from app.configuration.database import get_db
from app.presentation.crud.reserva_crud import create_reserva, list_reservas_del_dia

router = APIRouter(prefix="/reservas", tags=["reservas"])

@router.post("/", response_model=ReservaRead, status_code=status.HTTP_201_CREATED)
def crear_reserva(reserva_in: ReservaCreate, db: Session = Depends(get_db)):
    try:
        reserva = create_reserva(db, reserva_in)
        return reserva
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/hoy", response_model=list[ReservaRead])
def reservas_de_hoy(db: Session = Depends(get_db)):
    today = date.today()
    return list_reservas_del_dia(db, today)

@router.get("/dia/{target_date}", response_model=list[ReservaRead])
def reservas_por_dia(target_date: str, db: Session = Depends(get_db)):
    try:
        parsed = date.fromisoformat(target_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Fecha incorrecta. Use YYYY-MM-DD")
    return list_reservas_del_dia(db, parsed)
