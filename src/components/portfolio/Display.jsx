export default function Display({ children }) {
  return <div className="display-frame"><div className="display-screen">{children}</div><div className="usb-port" aria-hidden="true"><span /></div></div>;
}
