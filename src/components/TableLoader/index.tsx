import lottie from "lottie-web";
import { useEffect, useRef } from "react";

export const TableLoader: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../app/animations/loader.json"),
      });
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
      className="container"
      ref={container}
    />
  );
};
