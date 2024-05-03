import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type SliderProps = {
  children: ReactNode;
};

type SlidesContainerProps = {
  children: ReactNode[];
};

type SlideProps = {
  children: ReactNode;
  className?: string;
};

type LeftButtonProps = {
  children: ReactNode;
};

type RightButtonProps = {
  children: ReactNode;
};

interface SlideContextType {
  move: (direction: keyof typeof Directions) => void;
  slidesContainerRef: MutableRefObject<HTMLDivElement>;
  totalLength: number;
  setTotalLength: Dispatch<SetStateAction<number>>;
  slideIndex: number;
  setSlideIndex: Dispatch<SetStateAction<number>>;
}

const CarouselContext = createContext<SlideContextType>(null!);

const Directions = {
  LEFT: -1,
  RIGHT: 1,
} as const;

const Carousel = ({ children }: SliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null!);
  const [totalLength, setTotalLength] = useState<number>(0);

  const move = (direction: keyof typeof Directions) => {
    if (!totalLength) return;
    if (slideIndex + Directions[direction] < 0) return;
    if (slideIndex + Directions[direction] > totalLength - 1) return;

    setSlideIndex((prev) => prev + Directions[direction]);
  };

  return (
    <CarouselContext.Provider
      value={{
        move,
        slidesContainerRef,
        totalLength,
        slideIndex,
        setTotalLength,
        setSlideIndex,
      }}
    >
      <div className="relative overflow-hidden">{children}</div>
    </CarouselContext.Provider>
  );
};

const SlidesContainer = ({ children }: SlidesContainerProps) => {
  const context = useContext(CarouselContext);
  if (!context)
    throw new Error('SlidesContainer must be used within SliderContext');

  const { slidesContainerRef, setTotalLength, slideIndex, setSlideIndex } =
    context;

  console.log(children.length);

  useEffect(() => {
    setTotalLength(children.length);
    setSlideIndex(0);
  }, [children, setSlideIndex, setTotalLength]);

  return (
    <div
      ref={slidesContainerRef}
      style={{ transform: `translateX(-${slideIndex * 100}%)` }}
      className={`flex transition-transform duration-300 ease-in-out transform`}
    >
      {children}
    </div>
  );
};

const Slide = ({ children, className }: SlideProps) => {
  return (
    <div className={'flex justify-center min-w-full max-w-full ' + className}>
      {children}
    </div>
  );
};

const LeftButton = ({ children }: LeftButtonProps) => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('LeftButton must be used within SliderContext');

  const { move, slideIndex } = context;

  if (slideIndex === 0) return null;

  return (
    <button
      onClick={() => move('LEFT')}
      className="absolute top-1/2 -translate-y-1/2 z-10 left-0"
    >
      {children}
    </button>
  );
};

const RightButton = ({ children }: RightButtonProps) => {
  const context = useContext(CarouselContext);
  if (!context)
    throw new Error('RightButton must be used within SliderContext');

  const { move, slideIndex, totalLength } = context;

  if (slideIndex === totalLength - 1) return null;

  return (
    <button
      onClick={() => move('RIGHT')}
      className="absolute top-1/2 -translate-y-1/2 z-10 right-0 "
    >
      {children}
    </button>
  );
};

Carousel.SlidesContainer = SlidesContainer;
Carousel.Slide = Slide;
Carousel.LeftButton = LeftButton;
Carousel.RightButton = RightButton;

export default Carousel;
