# app/main.py
from fastapi import FastAPI
from app.configuration.database import engine, Base
from app.presentation.routes.clientes_routes import router as cliente_router
from app.presentation.routes.mesa_routes import router as mesa_router
from app.presentation.routes.reserva_routes import router as reserva_router
from fastapi.middleware.cors import CORSMiddleware
import os


Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Reservas - Restaurante", version="1.0")

# CORS para que el frontend consulte la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cliente_router)
app.include_router(mesa_router)
app.include_router(reserva_router)

@app.get("/")
def root():
    return {"API Reservas funcionando"}
