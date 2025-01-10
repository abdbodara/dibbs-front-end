import React from "react";

function Images({ fullsrc, file, name, classname, style, event }) {
  return (
    <img
      src={
        fullsrc
          ? fullsrc
          : file && name
          ? `/images/${file}/${name}`
          : `/images/img/user.png`
      }
      alt="not found"
      width={100}
      height={100}
      className={`${classname}`}
      style={{
        ...style,
      }}
      {...event}
    />
  );
}

export default Images;
