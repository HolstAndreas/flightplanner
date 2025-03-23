import { useEffect, useState } from "react";
import { SeatRecommendationParameters, SeatsResponse } from "../types";

interface SeatOverlayProps {
  seats: SeatsResponse[];
  isOpen: boolean;
  onClose: () => void;
  parameters: SeatRecommendationParameters
}

const SeatOverlay = ({ seats, isOpen, onClose, parameters}: SeatOverlayProps) => {
  const [columnA, setColumnA] = useState<SeatsResponse[]>([]);
  const [columnB, setColumnB] = useState<SeatsResponse[]>([]);
  const [columnC, setColumnC] = useState<SeatsResponse[]>([]);
  const [columnD, setColumnD] = useState<SeatsResponse[]>([]);
  const [columnE, setColumnE] = useState<SeatsResponse[]>([]);
  const [columnF, setColumnF] = useState<SeatsResponse[]>([]);
  const [columnG, setColumnG] = useState<SeatsResponse[]>([]);
  const [columnH, setColumnH] = useState<SeatsResponse[]>([]);
  const [columnI, setColumnI] = useState<SeatsResponse[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<SeatsResponse[]>([]);
  
  useEffect(() => {
    if (!isOpen) {
      // Reset all state when the overlay closes
      setColumnA([]);
      setColumnB([]);
      setColumnC([]);
      setColumnD([]);
      setColumnE([]);
      setColumnF([]);
      setColumnG([]);
      setColumnH([]);
      setColumnI([]);
      setSelectedSeats([]);
    }
  }, [isOpen]);


  useEffect(() => {
    console.log("Seat recommendation parameters: ", parameters);
    const a: SeatsResponse[] = [];
    const b: SeatsResponse[] = [];
    const c: SeatsResponse[] = [];
    const d: SeatsResponse[] = [];
    const e: SeatsResponse[] = [];
    const f: SeatsResponse[] = [];
    const g: SeatsResponse[] = [];
    const h: SeatsResponse[] = [];
    const i: SeatsResponse[] = [];

    if (!isOpen) return;

    const newScoring: Record<number, number> = {};

    seats.forEach((seat) => {
      switch (seat.seatColumn) {
        case 'A':
          a.push(seat);
          break;
        case 'B':
          b.push(seat);
          break;
        case 'C':
          c.push(seat);
          break;
        case 'D':
          d.push(seat);
          break;
        case 'E':
          e.push(seat);
          break;
        case 'F':
          f.push(seat);
          break;
        case 'G':
          g.push(seat);
          break;
        case 'H':
          h.push(seat);
          break;
        case 'I':
          i.push(seat);
          break;
      }
      
      if (!seat.taken && parameters) {
        let score = 0;
        if (parameters.travelClass && seat.travelClass !== parameters.travelClass) return;
        if (parameters.hasWindow && !seat.hasWindow) return;
        if (parameters.hasLegspace && !seat.hasLegSpace) return;
        if (parameters.hasExit && !seat.hasExit) return;

        if (parameters.hasWindow && seat.hasWindow) {
          score += 2;
        }

        if (parameters.hasLegspace && seat.hasLegSpace) {
          score += 2;
        }

        if (parameters.hasExit && seat.hasExit) {
          score += 1;
        }

        if (parameters.seatsAmount > 1) {
          const adjacentSeat = seats.filter(s =>
            !s.taken && s.seatRow === seat.seatRow && (s.seatId === seat.seatId + 1 || s.seatId === seat.seatId - 1)
          )
          score += adjacentSeat.length * 10
        }

        newScoring[seat.seatId] = score;
      }
    });

    if (Object.keys(newScoring).length > 0 && parameters) {
      const sortedSeats = Object.entries(newScoring)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

        const recommendedSeatIds: number[] = [];
        const seatsToRecommend = parameters.seatsAmount;
  
        for (let i = 0; i < sortedSeats.length; i++) {
          const [seatId, ] = sortedSeats[i];
          const seat = seats.find(s => s.seatId === parseInt(seatId));
  
          if (seat && !recommendedSeatIds.includes(seat.seatId)) {
            const adjacentSeats = seats.filter(s =>
              !s.taken &&
              s.seatRow === seat.seatRow &&
              Math.abs(s.seatId - seat.seatId) === 1 &&
              !recommendedSeatIds.includes(s.seatId)
            );
  
            if (adjacentSeats.length >= seatsToRecommend - 1) {
              recommendedSeatIds.push(seat.seatId);
              adjacentSeats.slice(0, seatsToRecommend - 1).forEach(adjSeat => {
                recommendedSeatIds.push(adjSeat.seatId);
              });
              break;
            }
          }
        }
  
        setSelectedSeats(seats.filter(seat => recommendedSeatIds.includes(seat.seatId)));
    } else {
      setSelectedSeats([])
    }

    setColumnA(a);
    setColumnB(b);
    setColumnC(c);
    setColumnD(d);
    setColumnE(e);
    setColumnF(f);
    setColumnG(g);
    setColumnH(h);
    setColumnI(i);
  }, [seats, parameters, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Seat Recommendation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >✕</button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Recommended Seats:</h3>
          {selectedSeats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {selectedSeats.map(seat => (
                <div key={seat.seatId} className="bg-amber-100 p-3 rounded shadow-sm">
                  <div className="font-medium">Seat: {seat.seatColumn}{seat.seatRow}</div>
                  <div>Class: {seat.travelClass}</div>
                  <div>Price: €{seat.price}</div>
                  <div className="text-sm mt-1">
                    {seat.hasWindow && <span className="mr-2">Window</span>}
                    {seat.hasLegSpace && <span className="mr-2">Extra legroom</span>}
                    {seat.hasExit && <span>Exit row</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No recommended seats available</div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          {/* Regular seat */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <span className="text-xs">Economy</span>
          </div>

          {/* Business Class */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded"></div>
            <span className="text-xs">Business</span>
          </div>

          {/* First Class */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded"></div>
            <span className="text-xs">First Class</span>
          </div>

          {/* Taken seat */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span className="text-xs">Taken</span>
          </div>

          {/* Window seat */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 border-t-2 rounded"></div>
            <span className="text-xs">Window</span>
          </div>

          {/* Extra legroom */}
          <div className="flex items-center gap-2">
            <div className="flex w-5 h-3 rounded border border-gray-300">
              <div className="w-3 h-3 bg-blue-300 rounded ml-2"></div>
            </div>
            <span className="text-xs">Extra Legroom</span>
          </div>

          {/* Exit row */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 border-l-2 border-l-red-400 rounded"></div>
            <span className="text-xs">Exit Row</span>
          </div>

          {/* Recommended seat */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-300 rounded"></div>
            <span className="text-xs">Recommended seat</span>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">A</div>
          {columnA.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-t-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">B</div>
          {columnB.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-t-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">C</div>
          {columnC.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-t-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25 mb-2
              `}>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">D</div>
          {columnD.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-t-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">E</div>
          {columnE.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-t-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">F</div>
          {columnF.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-b-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25 mb-2
              `}>
            </div>
          ))}
        </div>

        {columnG.length > 0 && (
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">G</div>
          {columnG.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-b-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        )}
        {columnH.length > 0 && (
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">H</div>
          {columnH.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-b-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        )}

        {columnI.length > 0 && (
        <div className="flex flex-wrap">
        <div className="w-3 h-3 text-xs mx-0.5 my-0.25 flex items-center justify-center">I</div>
          {columnI.map((seat) => (
            <div 
              key={seat.seatId} 
              className={`
                w-3 h-3
                ${seat.taken 
                  ? 'bg-gray-400' 
                  : selectedSeats.some(s => s.seatId === seat.seatId)
                    ? 'bg-amber-300 hover:bg-amber-400 cursor-pointer'
                    : seat.travelClass === 'FIRST'
                      ? 'bg-purple-400 hover:bg-purple-500 cursor-pointer'
                      : seat.travelClass === 'BUSINESS'
                        ? 'bg-emerald-400 hover:bg-emerald-500 cursor-pointer'
                        : 'bg-blue-300 hover:bg-blue-400 cursor-pointer'
                } 
                ${seat.hasWindow ? 'border-b-2' : ''}
                ${seat.hasLegSpace ? 'ml-2' : ''}
                ${seat.hasExit ? 'border-l-2 border-l-red-400' : ''}
                transition-colors rounded
                mx-0.5 my-0.25
              `}>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default SeatOverlay;