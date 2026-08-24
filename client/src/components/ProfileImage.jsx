import { useEffect, useState } from "react";

const ProfileImage = ({ image, alt = "Profile", className = "", style }) => {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (typeof image === "string") {
      setSrc(image);
      return undefined;
    }

    if (image instanceof Blob) {
      const objectUrl = URL.createObjectURL(image);
      setSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setSrc("");
    return undefined;
  }, [image]);

  if (!src) return null;

  return <img src={src} alt={alt} className={className} style={style} />;
};

export default ProfileImage;
