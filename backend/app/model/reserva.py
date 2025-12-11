# app/models/reserva.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, UniqueConstraint
from app.configuration.database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

class Reserva(Base):
    __tablename__ = "reservas"
    __table_args__ = (
        UniqueConstraint("mesa_id", "start_time", name="uq_mesa_start_time"),
    )

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id", ondelete="CASCADE"), nullable=False)
    mesa_id = Column(Integer, ForeignKey("mesas.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(DateTime, nullable=False, index=True)  # fecha + hora de la reserva
    requerimientos = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    cliente = relationship("Cliente", back_populates="reservas")
    mesa = relationship("Mesa", back_populates="reservas")

    def __repr__(self):
        return f"<Reserva id={self.id} mesa={self.mesa_id} tiempo={self.start_time}>"
