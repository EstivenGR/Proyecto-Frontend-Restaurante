# app/models/mesa.py
from sqlalchemy import Column, Integer, String
from app.configuration.database import Base
from sqlalchemy.orm import relationship

class Mesa(Base):
    __tablename__ = "mesas"

    id = Column(Integer, primary_key=True, index=True)
    numero = Column(String(10), unique=True, nullable=False)  
    capacidad = Column(Integer, nullable=False, default=2)

    reservas = relationship("Reserva", back_populates="mesa", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Mesa id={self.id} numero={self.numero} capacidad={self.capacidad}>"
