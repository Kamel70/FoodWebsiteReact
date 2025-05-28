export function Loading({ message }) {
  return (
    <div className="loading-container">
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
