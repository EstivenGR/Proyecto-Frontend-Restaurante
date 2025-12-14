from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional, List
from app.schemas.reserva_schema import ReservaCreate, ReservaRead
from app.configuration.database import get_db
from app.presentation.crud.reserva_crud import create_reserva, list_reservas_by_date

router = APIRouter(prefix="/reservas", tags=["reservas"])

@router.post("/", response_model=ReservaRead, status_code=status.HTTP_201_CREATED)
def crear_reserva(reserva_in: ReservaCreate, db: Session = Depends(get_db)):

    try:
        reserva_db = create_reserva(db, reserva_in)
        reservas_dia = list_reservas_by_date(db, reserva_in.fecha_reserva)
        
        for r in reservas_dia:
            if r.id == reserva_db.id:
                return r
            
        raise HTTPException(status_code=500, detail="Error al recuperar la reserva recién creada.")

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {e}")

@router.get("/", response_model=List[ReservaRead])
def listar_reservas_por_fecha(
    db: Session = Depends(get_db),
    target_date: Optional[date] = Query(date.today(), description="Fecha de las reservas a listar (YYYY-MM-DD)")
):
    
    return list_reservas_by_date(db, target_date)