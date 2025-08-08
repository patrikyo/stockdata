import { SpinnerCircular } from "spinners-react";

const Spinner = () => {
  return (
    <SpinnerCircular
      size={70}
      thickness={70}
      speed={150}
      color="#fff"
      secondaryColor="#efefef1a"
    />
  );
};

export default Spinner;
