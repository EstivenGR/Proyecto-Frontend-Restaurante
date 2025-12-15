from sqlalchemy import Column, Integer, ForeignKey, Date, Text, UniqueConstraint, String
from app.configuration.database import Base
from sqlalchemy.orm import relationship
from datetime import date 

class Reserva(Base):
    __tablename__ = "reserva"
    __table_args__ = (
        UniqueConstraint("mesa_id", "start_time", "hora_reserva", name="uq_mesa_fecha_hora"),
    )

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("cliente.id", ondelete="CASCADE"), nullable=False)
    mesa_id = Column(Integer, ForeignKey("mesa.id", ondelete="CASCADE"), nullable=False)
    
    start_time = Column(Date, nullable=False, index=True)  
    
    hora_reserva = Column(String(5), nullable=False)
    
    requerimientos = Column(Text, nullable=True)

    cliente = relationship("Cliente", back_populates="reservas")
    mesa = relationship("Mesa", back_populates="reservas")

    def __repr__(self):
        return f"<Reserva id={self.id} mesa={self.mesa_id} fecha={self.start_time}>"