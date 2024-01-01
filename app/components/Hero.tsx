import ActionLink from "./base/ActionLink";

const Hero = () => {
  return (
    <main className="flex justify-center items-center mt-20">
      <div className="max-w-6xl flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="text-6xl font-bold leading-snug">
          Discover the Power of Anonymity.
          <br /> Your Gateway to <span className="bg-[#FC881D] px-1">
            Anonymous
          </span>{" "}
          Connections and Polls
        </h1>
        <p>
          Whisper, where your voice can be heard without boundaries. Connect
          with others through anonymous messages or spark conversations with
          stealthy polls.
        </p>
        <ActionLink href="/login" name="Get Started" />
      </div>
      <div></div>
    </main>
  );
};

export default Hero;
