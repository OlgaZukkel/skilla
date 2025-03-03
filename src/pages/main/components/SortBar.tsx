import {memo} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "components/ui/select.js";
import {useGetData} from "hooks/useGetData.js";
import {Calendar1Icon} from "lucide-react";
import CalendarIcon from "assets/svg/CalendarIcon.js";
import Chevron from "assets/svg/Chevron.js";

const SortBar = memo(() => {
  return (
    <div className='w-full pb-[3px] flex justify-between items-center'>
      <Select>
        <SelectTrigger
          className="w-fit border-none shadow-none p-0 text-text_secondary font-normal text-sm leading-[20.72px] tracking-[0%] gap-1 [&>svg]:stroke-ui_icon [&>svg]:opacity-100 focus:ring-0">
          <SelectValue placeholder="Select a fruit" />
          <Chevron color={'#ADBFDF'}/>
        </SelectTrigger>
        <SelectContent
          onClick={(e) => e.preventDefault()}
          className='py-1 shadow-[0px_4px_20px_0px_#00000014]  rounded-lg w-[13.3rem]'>
          <SelectGroup className='px-0 '>
            <SelectItem value="apple" className='cursor-pointer [&>svg]:hidden py-[.438rem] px-3 focus:bg-[#DEE4FF] font-normal text-xs leading-[18px] tracking-[0%] rounded-none'>Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-fit border-none shadow-none p-0 !text-[#005FF8] font-normal text-sm leading-[16px] tracking-[0%] gap-2 focus:ring-0">
          <Chevron color={'#ADBFDF'} className='rotate-90 mr-3'/>
          <CalendarIcon color='#ADBFDF'/>
          <SelectValue placeholder="3 дня" />
          <Chevron color={'#ADBFDF'} className='-rotate-90 ml-3'/>
        </SelectTrigger>
        <SelectContent className='px-0 py-1 shadow-[0px_0px_26px_0px_#E9EDF3CC] border-[#EAF0FA] w-[12.75rem]'>
          <SelectGroup>
            <SelectItem value="apple" className='cursor-pointer rounded-none [&>svg]:hidden py-1.5 px-5 focus:bg-[#DEE4FF] font-normal text-xs leading-[18px] tracking-[0%]'>Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
})
export default SortBar