import ActionLink from "./base/ActionLink";

const Hero = () => {
  return (
    <main className="flex justify-center items-center mt-20">
      <div className="max-w-4xl flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="text-5xl font-bold leading-snug text-[#171717]">
          Discover the Power of <br /> Anonymity.
        </h1>
        <p className="text-[#282828]">
          Whisper, where your voice can be heard without boundaries. Connect
          with others through anonymous messages or spark conversations with
          stealthy polls.
        </p>
        <ActionLink href="/messages" name="Get Started" />
      </div>
      <div></div>
    </main>
  );
};

export default Hero;
