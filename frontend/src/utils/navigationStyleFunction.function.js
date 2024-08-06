export const styleFunctionForMiddleLink = ({ isActive }) => {
  return isActive
    ? "bg-[#1a1a1a] px-4 py-[10px] rounded-md self-center"
    : "px-4 py-[10px] rounded-md hover:bg-[#1a1a1a] self-center";
};

export const styleFunctionForFirstLink = ({ isActive }) => {
  return isActive
    ? "bg-[#1a1a1a] px-4 py-[10px] self-center rounded-md"
    : "px-4 py-[10px] self-center rounded-md bg-[#1585e0]";
};

export const styleFunctionForLastLink = ({ isActive }) => {
  return isActive
    ? "bg-secondary-blue px-4 text-center self-center py-[10px] rounded-md"
    : "px-4 py-[10px] rounded-md hover:bg-secondary-blue bg-primary-blue self-center";
};
