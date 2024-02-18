import { gsap } from "gsap";

const useCardAnimation = () => {
  const handleUseCardAnimation = (
    sectionRef: any,
    className: string,
    animationDirection: string = "bottom-to-top"
  ) => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      const handleScroll = () => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight / 2) {
          let animationProps: any = {
            opacity: 0,
            y: 100,
            duration: 1,
            stagger: 0.5,
            ease: "power4.out",
          };

          switch (animationDirection) {
            case "top-to-bottom":
              animationProps.y = -100;
              break;
            case "left-to-right":
              animationProps.x = -100;
              break;
            case "right-to-left":
              animationProps.x = 100;
              break;
            default:
              "bottom-to-top";
              animationProps.y = 100;
              break;
          }

          gsap.from(`.${className}`, animationProps);
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  };
  return handleUseCardAnimation;
};

export default useCardAnimation;
