# app/models/cliente.py
from sqlalchemy import Column, Integer, String
from app.configuration.database import Base
from sqlalchemy.orm import relationship

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(120), nullable=False)
    telefono = Column(String(30), nullable=True)
    email = Column(String(120), nullable=True)

    reservas = relationship("Reserva", back_populates="cliente", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Cliente id={self.id} nombre={self.nombre}>"
