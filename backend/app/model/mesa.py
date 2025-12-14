from sqlalchemy import Column, Integer, String
from sqlalchemy.types import Enum as SQLEnum 
from app.configuration.database import Base
from sqlalchemy.orm import relationship

from app.schemas.mesa_status import EstadoMesa 

class Mesa(Base):
    __tablename__ = "mesa"

    id = Column(Integer, primary_key=True, index=True)
    numero = Column(String(10), unique=True, nullable=False)  
    capacidad = Column(Integer, nullable=False, default=2)
    estado = Column(
        SQLEnum(EstadoMesa, name='mesa_estado_enum'), 
        nullable=False, 
        default=EstadoMesa.DISPONIBLE
    )
    
    reservas = relationship("Reserva", back_populates="mesa", cascade="all, delete-orphan")

    def __repr__(self):

        return f"<Mesa id={self.id} numero={self.numero} estado={self.estado.value}>"