import { SpinnerCircular } from "spinners-react";

const Spinner = () => {
  return (
    <SpinnerCircular
      size={40}
      thickness={100}
      speed={100}
      color="#06b6d4"
      secondaryColor="rgba(0,0,0,0.1)"
    />
  );
};

export default Spinner;
