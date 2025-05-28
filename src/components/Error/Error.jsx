export default function Error({ message }) {
  return (
    <div className="error">
      <h2>Error Oucured</h2>
      <p>{message || "An unexpected error occurred."}</p>
    </div>
  );
}
