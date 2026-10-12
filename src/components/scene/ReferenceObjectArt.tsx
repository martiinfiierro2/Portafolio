import { useId } from 'react';

type ObjectKind = 'laptop' | 'notebook' | 'folder' | 'phone';
const images = {
  notebook: { src: '/desk/reference-notebook.webp', width: 720, height: 800 },
  folder: { src: '/desk/reference-folder.webp', width: 720, height: 968 },
  phone: { src: '/desk/phone.webp', width: 480, height: 720 },
} as const;

export default function ReferenceObjectArt({ kind }: { kind: ObjectKind }) {
  const maskId = useId();
  if (kind !== 'laptop')
    return (
      <img
        className="reference-object-art"
        data-kind={kind}
        {...images[kind]}
        alt=""
        aria-hidden="true"
        decoding="async"
        draggable={false}
      />
    );
  // The laptop retains the source photograph's pixels and perspective.
  return (
    <svg
      className="reference-object-art"
      data-kind={kind}
      viewBox="510 440 700 420"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={maskId}>
          <path d="M554 447H1137Q1160 447 1165 472L1207 827Q1209 850 1185 855H538Q511 850 512 826L520 474Q522 447 554 447Z" />
        </clipPath>
      </defs>
      <image href="/desk/reference.webp" width="1672" height="941" clipPath={`url(#${maskId})`} />
    </svg>
  );
}
