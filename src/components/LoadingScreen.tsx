export default function LoadingScreen() {
    return (
      <div className="loader-container">
        <div className="church-spinner"></div>
        {/* Church Logo inside the spinner */}
        <img 
          src="https://i.pinimg.com/1200x/c0/d1/e1/c0d1e14223a03cf6209e66d284ab6bf2.jpg" 
          alt="Lakeside Logo" 
          className="loader-logo animate-pulse"
        />
      </div>
    );
  }