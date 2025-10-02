import { useRef, useState } from "react";

export function HorizontalSlider({ children, className = "" }) {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [moved, setMoved] = useState(false);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setStartY(e.pageY - sliderRef.current.offsetTop);
    setScrollLeft(sliderRef.current.scrollLeft);
    setScrollTop(sliderRef.current.scrollTop);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const y = e.pageY - sliderRef.current.offsetTop;

    const walkX = (x - startX) * 1;
    const walkY = (y - startY) * 1;

    if (Math.abs(walkX) > 3 || Math.abs(walkY) > 3) {
      setMoved(true);
    }

    sliderRef.current.scrollLeft = scrollLeft - walkX;
    sliderRef.current.scrollTop = scrollTop - walkY;
  };

  const handleClickCapture = (e) => {
    if (moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
      className={`overflow-auto cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  );
}
