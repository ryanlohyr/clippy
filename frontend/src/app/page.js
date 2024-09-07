import Chatbot from "@/components/chat/chatbot";

export default function Home() {
  return (
    <div className="w-full  min-h-screen bg-white">
      <div className="flex flex-col  items-center ">
        <img
          className="w-[500px] mt-4 rounded-full"
          src="https://www.nbc.com/sites/nbcblog/files/2022/07/the-office-how-to-watch.jpg"
          alt="The Office"
        />
      </div>
      <div className="w-full  flex flex-col items-center justify-center">
        <Chatbot />
      </div>
    </div>
  );
}
