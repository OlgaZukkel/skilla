import {memo, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "components/ui/table.js";
import ArrowIcon from "assets/svg/ArrowIcon.js";
import AvatarIcon from "assets/svg/AvatarIcon.js";
import {useGetData} from "hooks/useGetData.js";
import {DateTime} from "luxon";
import PlayButton from "assets/svg/PlayButton.js";
import DownloadIcon from "assets/svg/DownloadIcon.js";
import CloseIcon from "assets/svg/CloseIcon.js";
import Chevron from "assets/svg/Chevron.js";

const headers = ['Тип', 'Время', 'Сотрудник', 'Звонок', 'Источник', 'Оценка', 'Длительность']
const Grade = memo(() => {
  return (
    <div
      className='px-4 py-1.5 font-normal text-sm leading-[14px] tracking-[0%] text-[#00A775] border border-ui_green bg-ui_light_green rounded-[4px] w-fit'>Отлично</div>
  )
})
const TableContent = memo(() => {
  const { filteredData} = useGetData();
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className='bg-white rounded-[8px]  px-10 max-h-[70vh] overflow-y-auto'>
      <Table>
        <TableHeader className="bg-white sticky top-0 z-20">
          <TableRow className=''>
            {
              headers.map((h, i) => (
                <TableHead key={i}
                           className={` py-6 ${i === 3 || i === 4 ? 'w-[12rem]' : ''} `}>
                  <div
                    className={`flex items-center gap-1 ${i === headers.length - 1 ? 'justify-end' : 'justify-start'}`}>
                    {h}
                    {
                      (i === 1 || i === headers.length - 1) && (
                        <Chevron className=''/>
                      )
                    }
                  </div>

                </TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredData?.map((item, index) => {
              const dateTime = DateTime.fromFormat(item.date, "yyyy-MM-dd HH:mm:ss")
              return (
                <TableRow key={index} className='h-[65px] hover:bg-[#D4DFF32B] group'>
                  <TableCell className="py-0 font-medium ">{
                    (() => {
                      switch (item.status) {
                        case "Дозвонился":
                          return <ArrowIcon color='#28A879' className='rotate-180'/>
                        case "Не дозвонился":
                          return <ArrowIcon color='#EA1A4F' className='rotate-180'/>
                      }
                    })()
                  }</TableCell>
                  <TableCell className='py-0'>{dateTime.toFormat("HH:mm")}</TableCell>
                  <TableCell>
                    {
                      item.person_avatar
                        ? <div
                          style={{
                            backgroundImage: `url(${item.person_avatar})`
                          }}
                          className='w-8 h-8 bg-contain bg-center bg-no-repeat'/>
                        : <AvatarIcon/>
                    }
                  </TableCell>
                  <TableCell className="text-left">{item.from_number}</TableCell>
                  <TableCell className="text-left">{item.source}</TableCell>
                  <TableCell className="text-left">
                    {
                      item.errors.length > 0
                        ? <div>
                          {
                            item.errors.map((error, i) => (
                              <p key={i}
                                 className='font-normal text-sm leading-[19.6px] tracking-[0%] text-ui_red'>{error}</p>
                            ))
                          }
                        </div>
                        : <Grade/>
                    }
                  </TableCell>
                  <TableCell className="flex justify-end relative top-1/2">
                    {
                      item.record && (
                        <p
                          className='absolute right-5 font-normal text-[15px] leading-[21.75px] tracking-[0%] text-left group-hover:opacity-0'>{formatTime(item.time)}</p>
                      )
                    }
                    {
                      item.record && (
                        <div
                          className={`opacity-0 group-hover:opacity-100 w-[22rem] bg-[#EAF0FA] rounded-[3rem] h-12 px-5 transition flex items-center gap-3`}>
                          <p
                            className='w-1/6 font-normal text-[15px] leading-[21.75px] tracking-[0%] text-right'>{formatTime(item.time)}</p>
                          <div className='flex-1 flex items-center gap-3'>
                            <div className='flex gap-2 items-center'>
                              <PlayButton className='cursor-pointer'/>
                              <div className='h-1 w-[10.25rem] bg-ui_icon rounded-1/2'/>
                            </div>
                            <DownloadIcon className={`fill-ui_icon hover:fill-ui_accent transition cursor-pointer`}/>
                            <CloseIcon className=' cursor-pointer transition fill-ui_icon hover:fill-ui_accent'/>
                          </div>
                        </div>
                      )
                    }
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
})
export default TableContent