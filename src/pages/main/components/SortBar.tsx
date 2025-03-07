import {memo, useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/ui/select.js";
import CalendarIcon from "assets/svg/CalendarIcon.js";
import Chevron from "assets/svg/Chevron.js";
import CalendarPicker from "pages/main/components/CalendarPicker.js";
import {useGetData} from "hooks/useGetData.js";
import {format} from "date-fns";


const types = [
  {
    id: undefined,
    title: 'Все типы'
  },
  {
    id: 1,
    title: 'Входящие'
  },
  {
    id: 0,
    title: 'Исходящие'
  },
]
const period = [
  {
    title: '3 дня'
  },
  {
    title: 'Неделя'
  },
  {
    title: 'Месяц'
  },
  {
    title: 'Год'
  },
  {
    title: 'Указать даты'
  },
]
const SortBar = memo(() => {
  const {setInOut, setOpenCalendar, date, setDate} = useGetData();
  const [typeValue, setTypeValue] = useState(types[0].title);
  const [periodValue, setPeriodValue] = useState(period[0].title);
  const handleTypeValue = (value: string) => {
    const parsedObject = JSON.parse(value); // *parse the object here
    setInOut(parsedObject.id)
    setTypeValue(parsedObject.title)
  };
  return (
    <div className='w-full pb-[3px] flex justify-between items-center'>
      <Select
        onValueChange={handleTypeValue}
      >
        <SelectTrigger
          className="w-fit border-none shadow-none p-0  font-normal text-sm leading-[20.72px] tracking-[0%] gap-1 [&>svg]:stroke-ui_icon [&>svg]:opacity-100 focus:ring-0 text-[#122945] data-[placeholder]:text-black">
          <SelectValue placeholder={typeValue}/>
          <Chevron color={'#ADBFDF'}/>
        </SelectTrigger>
        <SelectContent
          className='py-1 shadow-[0px_4px_20px_0px_#00000014]  rounded-lg w-[13.3rem]'>
          <SelectGroup
            className='px-0 '>
            {
              types.map((item, i) => (
                <div key={i} onClick={() => {
                }} className='flex flex-col w-full'>
                  <SelectItem
                    value={JSON.stringify(item)}
                    className={`cursor-pointer [&>svg]:hidden py-[.438rem] px-3 focus:bg-[#DEE4FF] font-normal text-xs leading-[18px] tracking-[0%] rounded-none ${item.title === typeValue ? 'text-ui_accent focus:text-ui_accent' : ''} `}>
                    {item.title}
                  </SelectItem>
                </div>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onOpenChange={() => setOpenCalendar(false)}
        onValueChange={(value) => {
          setPeriodValue(value)
          setDate(undefined)
        }}
      >
        <SelectTrigger
          className="w-fit border-none shadow-none p-0 !text-[#005FF8] font-normal text-sm leading-[16px] tracking-[0%] gap-2 focus:ring-0 group group-hover:text-ui_accent [&>span]:hover:text-ui_accent">
          <Chevron className='rotate-90 mr-3 fill-ui_icon hover:fill-ui_accent'/>
          <CalendarIcon className='fill-[#ADBFDF] group-hover:fill-ui_accent'/>
          {(date?.from && date.to)
            ? (
              <>
                {format(date.from, "dd.MM.yy")} -{" "}
                {format(date.to, "dd.MM.yy")}
              </>)
            : (
              <SelectValue placeholder={periodValue}/>
            )
          }

          <Chevron className='-rotate-90 ml-3 fill-ui_icon hover:fill-ui_accent'/>
        </SelectTrigger>
        <SelectContent
          className='-top-[36px] px-0 py-1 shadow-[0px_0px_26px_0px_#E9EDF3CC] border-[#EAF0FA] w-full max-w-[14.75rem]'>
          <SelectGroup>
            {
              period.map((item, i) => (
                <SelectItem value={item.title} key={i}
                            className={`rounded-none [&>svg]:hidden py-1.5 px-5 focus:bg-[#DEE4FF] font-normal text-xs leading-[18px] tracking-[0%] ${item.title === periodValue ? 'text-ui_accent focus:text-ui_accent' : ''} ${i === period.length - 1 ? '' : 'cursor-pointer '}`}>{item.title}</SelectItem>
              ))
            }
            <div className='w-full px-5  '>
              <CalendarPicker/>
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
})
export default SortBar