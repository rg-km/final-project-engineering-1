const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center">
      <h1 className="loading wave-animation text-3xl font-bold text-white">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
      </h1>
    </div>
  );
};
export default Loading;
