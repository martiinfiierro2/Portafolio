import UsbPort from './UsbPort';

export default function Display({ children }) {
  return <div className="display-frame"><div className="display-screen">{children}</div><UsbPort /></div>;
}
