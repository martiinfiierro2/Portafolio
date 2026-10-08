import { useId } from 'react';

export default function UsbPort() {
  const id = useId();
  return <svg className="usb-port" viewBox="0 0 20 60" aria-hidden="true" focusable="false">
    <defs><linearGradient id={id}><stop stopColor="#eeeef1" /><stop offset=".5" stopColor="#95959f" /><stop offset="1" stopColor="#dddde3" /></linearGradient></defs>
    <rect x="1" y="1" width="18" height="58" rx="5" fill={`url(#${id})`} stroke="#73737d" />
    <rect x="4" y="5" width="12" height="50" rx="2" fill="#15151c" stroke="#f3f3f5" />
    <rect x="11" y="10" width="3" height="40" rx="1" fill="#575764" />
    <path d="M11 17h3m-3 8h3m-3 8h3m-3 8h3" stroke="#cfb677" strokeWidth="2" />
  </svg>;
}
