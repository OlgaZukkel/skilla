import {memo} from "react";
import SortBar from "pages/main/components/SortBar.js";
import Table from "pages/main/components/Table.js";
import TableContent from "pages/main/components/Table.js";

const MainPage = memo(() => {
  return (
    <div className='py-20 px-4 w-full bg-[#F1F4F9] h-full'>
      <div className='w-full max-w-[90rem] mx-auto flex flex-col gap-4 '>
        <SortBar/>
        <TableContent/>
      </div>
    </div>
  )
})
export default MainPage