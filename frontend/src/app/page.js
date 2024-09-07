import Chatbot from "@/components/chat/chatbot";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="https://dn720407.ca.archive.org/0/items/rick-roll/Rick%20Roll.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content on top of the video */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          className="w-[500px] mt-4 rounded-full"
          src="https://www.nbc.com/sites/nbcblog/files/2022/07/the-office-how-to-watch.jpg"
          alt="The Office"
        />
        <div className="w-[100vw] flex flex-col items-center justify-center">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
