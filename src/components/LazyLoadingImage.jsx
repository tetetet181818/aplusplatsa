import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const MyImage = ({ src, alt, className }) => (
  <div>
    <LazyLoadImage
      alt={alt}
      height={"100%"}
      src={src}
      width={"100%"}
      effect="blur"
      className={className}
    />
  </div>
);

export default MyImage;
