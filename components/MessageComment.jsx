import Image from "next/image";

function MessageComment({ name, message, image, timestamp, visible }) {
  return (
    <div className="relative flex items-start text-sm p-2 dark:text-white animate-visible">
      <div>
        <Image
          className="rounded-full"
          src={image}
          width={30}
          height={30}
          layout="fixed"
        />
      </div>

      <div className="absolute left-[-5px] top-[-5px] w-10 h-14 border-2 dark:border-[#18191A]  border-r-0 border-t-0 rounded-bl-md" />

      <div className="flex flex-col rounded-xl p-2 ml-2 bg-[white] dark:bg-[#2f3031]">
        <div>
          <p className="text-md leading-tight font-medium">{name}</p>
          <p className="text-justify min-w-[200px]">{message}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-end items-center mt-1">
            <p className="text-[10px] text-gray-500 leading-tight">
              {new Date(timestamp?.toDate()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageComment;
