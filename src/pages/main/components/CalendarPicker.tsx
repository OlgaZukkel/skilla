import {memo, useState} from "react";
import {cn} from "@/lib/utils.js";
import {Popover, PopoverContent, PopoverTrigger} from "components/ui/popover.js";
import {Button} from "components/ui/button.js";
import {Calendar} from "components/ui/calendar.js";
import {DateRange} from "react-day-picker";
import {addDays, format} from "date-fns";
import {useGetData} from "hooks/useGetData.js";
import CalendarIcon from "assets/svg/CalendarIcon.js";

const CalendarPicker = memo(() => {
  const {openCalendar, setOpenCalendar} = useGetData()
  const [date, setDate] = useState<DateRange | undefined>(
    /*{
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }*/
  )

  return (
    <div className={cn("grid gap-2")}>
      <Popover
        onOpenChange={() => setOpenCalendar(!openCalendar)}
        open={openCalendar}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setOpenCalendar(!openCalendar)}
            id="date"
            className={cn(
              " text-left font-normal p-0 bg-white shadow-none text-black hover:bg-white justify-between",
              !date && "text-muted-foreground"
            )}
          >
            <div className='w-[8.3rem]'>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd.MM.yy")} -{" "}
                  {format(date.to, "dd.MM.yy")}
                </>
              ) : (
                <>
                  {format(date.from, "dd.MM.yy")}
                   &nbsp;-
                  <span> __.__.__ </span>
                </>
              )
            ) : (
              <div className='text-ui_icon'>
                <span>__.__.__</span>
                <span>-</span>
                <span>__.__.__</span>
              </div>

            )}
            </div>
              <CalendarIcon className='w-full fill-ui_icon hover:fill-ui_accent min-w-4 cursor-pointer ml-3'/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 right-10" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
})
export default CalendarPicker