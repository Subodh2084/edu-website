"use client";

import { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  number: string;
  message?: string;
}

export default function WhatsAppButton({
  number,
  message = "Hello! I'm interested in your courses.",
}: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Fade in after a short delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Stop pulse ring after 6s so it doesn't distract forever
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)",
        transition: "opacity 0.4s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.6)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 6px 28px rgba(37,211,102,0.6), 0 3px 12px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.18)";
      }}
    >
      {/* Pulse ring */}
      {pulse && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid #25D366",
            animation: "wa-pulse 1.4s ease-out infinite",
          }}
        />
      )}

      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.002 2C8.269 2 2 8.269 2 16.002c0 2.476.65 4.865 1.88 6.97L2 30l7.23-1.845A13.94 13.94 0 0 0 16.002 30C23.731 30 30 23.731 30 16.002 30 8.269 23.731 2 16.002 2zm0 25.385a11.347 11.347 0 0 1-5.787-1.585l-.415-.247-4.294 1.096 1.117-4.182-.27-.428A11.317 11.317 0 0 1 4.614 16c0-6.278 5.11-11.385 11.388-11.385S27.386 9.722 27.386 16c0 6.277-5.11 11.385-11.384 11.385zm6.247-8.52c-.342-.172-2.025-1-2.337-1.112-.313-.114-.54-.172-.767.172-.228.342-.883 1.112-1.082 1.34-.2.228-.4.256-.741.086-.342-.172-1.443-.532-2.75-1.698-1.016-.907-1.702-2.026-1.902-2.368-.199-.342-.021-.527.15-.697.154-.153.342-.4.513-.599.17-.2.228-.343.342-.571.114-.228.057-.428-.028-.599-.086-.172-.767-1.851-1.052-2.535-.277-.666-.558-.575-.767-.586-.2-.01-.428-.013-.656-.013s-.599.085-.913.428c-.313.342-1.197 1.17-1.197 2.85 0 1.68 1.225 3.304 1.396 3.532.17.228 2.411 3.682 5.843 5.163.817.352 1.453.563 1.95.72.82.261 1.567.224 2.157.136.658-.099 2.025-.827 2.31-1.626.285-.8.285-1.485.2-1.627-.086-.143-.313-.228-.656-.4z" />
      </svg>

      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
