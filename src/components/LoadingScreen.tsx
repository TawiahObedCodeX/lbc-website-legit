export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-8 bg-[#0D1654]">

      {/* Spinner + Logo */}
      <div className="relative flex items-center justify-content w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52">

        {/* Outer ring — clockwise */}
        <div className="absolute inset-0 rounded-full border-[3px] border-secondary/25 border-t-secondary border-r-secondary/50 animate-spin [animation-duration:1.4s]" />

        {/* Inner ring — counter-clockwise */}
        <div
          className="absolute inset-4 sm:inset-5 rounded-full border-2 border-transparent border-b-white/60 border-l-white/25 animate-spin [animation-duration:2s]"
          style={{ animationDirection: "reverse" }}
        />

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[52%] h-[52%] rounded-full overflow-hidden border-2 border-secondary shadow-[0_0_22px_rgba(197,160,89,0.45)] animate-pulse">
            <img
              src="https://i.pinimg.com/1200x/c0/d1/e1/c0d1e14223a03cf6209e66d284ab6bf2.jpg"
              alt="Lakeside Baptist Church"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* Church name */}
      <p className="font-display text-white/80 text-[11px] sm:text-sm tracking-[0.35em] animate-pulse select-none">
        LAKESIDE BAPTIST
      </p>

    </div>
  );
}