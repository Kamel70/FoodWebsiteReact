function AddButton({ onClick }) {
  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      Add
    </button>
  );
}
export default AddButton;
