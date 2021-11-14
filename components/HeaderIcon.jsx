function HeaderIcon({ Icon, active }) {
  return (
    <div className="px-2 dark:hover:bg-[#303031] dark:border-[#18191A] md:hover:bg-gray-300 md:p-3 md:px-7 lg:px-9 rounded-xl cursor-pointer text-gray-500 border-b-2 border-[whitesmoke] active:border-b-2 active:border-blue-500 dark:active:border-blue-500 group">
      <Icon
        className={`group-hover:text-blue-500 ${active && "text-blue-500"}`}
        width={25}
        height={25}
      />
    </div>
  );
}

export default HeaderIcon;
