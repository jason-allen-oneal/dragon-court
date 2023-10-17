export default function Welcome({text, beginGame}, {text: string, beginGame: any}) {
  return (
    <div className="mx-auto my-6">
      <div className="text-center">
        {text}
      </div>
      <div className="text-center mt-6">
        <button className="btn btn-primary" onClick={beginGame}>Go Adventuring!</button>
      </div>
    </div>
  );
}