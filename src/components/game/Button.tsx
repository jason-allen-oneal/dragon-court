type Props = {
  text: string;
  size?: string;
  handler: (data: any) => void | (() => void);
};

export default function Button({text, size, handler}: Props) {
  if(size === undefined){
    size = "xs";
  }
  return (
    <button className={`m-2 btn btn-${size} btn-secondary btn-outline`} onClick={handler}>{text}</button>
  );
}