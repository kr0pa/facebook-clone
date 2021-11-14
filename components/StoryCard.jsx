import Image from "next/image";

function StoryCard({ name, src, profile }) {
  return (
    <div className="relative h-14 w-14 lg:h-60 lg:w-40 cursor-pointer p-2 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
      <Image
        className="absolute opacity-0 lg:opacity-100 rounded-full z-50"
        src={profile}
        width={40}
        height={40}
        layout="fixed"
        objectFit="cover"
      />

      <Image
        className="object-cover filter brightness-75 rounded-full lg:rounded-3xl"
        src={src}
        layout="fill"
      />
    </div>
  );
}

export default StoryCard;
