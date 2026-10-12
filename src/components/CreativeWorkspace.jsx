export default function CreativeWorkspace() {
  return (
    <svg
      className="creative-workspace"
      viewBox="0 0 460 320"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="230"
        cy="281"
        rx="162"
        ry="12"
        className="workspace-shadow"
      />
      <rect
        x="88"
        y="52"
        width="284"
        height="202"
        rx="19"
        className="workspace-device"
      />
      <rect
        x="100"
        y="64"
        width="260"
        height="178"
        rx="11"
        className="workspace-screen"
      />
      <path d="M100 92h260" className="workspace-rule" />
      <circle cx="112" cy="78" r="3" className="workspace-accent" />
      <circle
        cx="123"
        cy="78"
        r="3"
        className="workspace-accent workspace-faint"
      />
      <circle
        cx="134"
        cy="78"
        r="3"
        className="workspace-accent workspace-faint"
      />
      <rect
        x="119"
        y="109"
        width="112"
        height="84"
        rx="10"
        className="workspace-tile"
      />
      <circle cx="175" cy="150" r="22" className="workspace-accent" />
      <path d="m170 139 15 11-15 11v-22Z" className="workspace-play" />
      <rect
        x="245"
        y="113"
        width="93"
        height="10"
        rx="5"
        className="workspace-device"
      />
      <rect
        x="245"
        y="135"
        width="75"
        height="6"
        rx="3"
        className="workspace-soft"
      />
      <rect
        x="245"
        y="150"
        width="83"
        height="6"
        rx="3"
        className="workspace-soft"
      />
      <rect
        x="245"
        y="177"
        width="67"
        height="20"
        rx="10"
        className="workspace-accent"
      />
      <rect
        x="119"
        y="211"
        width="78"
        height="6"
        rx="3"
        className="workspace-soft"
      />
      <rect
        x="204"
        y="211"
        width="41"
        height="6"
        rx="3"
        className="workspace-soft"
      />
      <path
        d="M88 254h284l26 13a5 5 0 0 1-2 10H64a5 5 0 0 1-2-10l26-13Z"
        className="workspace-device"
      />
      <rect
        x="203"
        y="254"
        width="53"
        height="5"
        rx="2.5"
        className="workspace-screen"
      />
      <path d="m335 208 7 31 8-9 12-1-27-21Z" className="workspace-cursor" />
      <path
        d="m65 91-12-8m17-8 1-15m313 62 16-3m-14 15 12 8"
        className="workspace-spark"
      />
      <circle cx="67" cy="178" r="7" className="workspace-ring" />
      <rect
        x="372"
        y="45"
        width="38"
        height="38"
        rx="12"
        transform="rotate(12 372 45)"
        className="workspace-accent"
      />
      <path d="m382 59 10 13m0-13-10 13" className="workspace-mark" />
    </svg>
  );
}
