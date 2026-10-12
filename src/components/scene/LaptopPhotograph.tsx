import { useId } from 'react';

// Display the original laptop pixels in a separate layer, preserving its material and perspective.
export default function LaptopPhotograph() {
  const maskId = useId();
  return (
    <svg
      className="laptop-source-art"
      viewBox="480 440 756 415"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={maskId}>
          <path d="M548 444H1159Q1180 444 1184 469L1234 816Q1238 838 1217 848H516Q481 843 480 817L519 467Q522 444 548 444Z" />
        </clipPath>
      </defs>
      <image href="/desk/cover.webp" width="1672" height="941" clipPath={`url(#${maskId})`} />
    </svg>
  );
}
