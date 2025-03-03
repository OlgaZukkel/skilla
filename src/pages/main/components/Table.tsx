import {memo} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "components/ui/table.js";
import ArrowIcon from "assets/svg/ArrowIcon.js";
import AvatarIcon from "assets/svg/AvatarIcon.js";
import {useGetData} from "hooks/useGetData.js";

const Grade = memo(() => {
  return (
    <div
      className='px-4 py-1.5 font-normal text-sm leading-[14px] tracking-[0%] text-[#00A775] border border-ui_green bg-ui_light_green rounded-[4px] w-fit'>Отлично</div>
  )
})
const headers = ['Тип', 'Время', 'Сотрудник', 'Звонок', 'Источник', 'Оценка', 'Длительность']
const TableContent = memo(() => {
  const {data} = useGetData();

  return (
    <div className='bg-white rounded-[8px]  px-10 max-h-[70vh] overflow-y-auto'>
      <Table>
        <TableHeader className="bg-white sticky top-0">
          <TableRow className=''>
            {
              headers.map((h, i) => (
                <TableHead key={i} className="w-[100px] py-6">{h}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody  className=''>
          {
            data?.results?.map((item, index) => (
              <TableRow key={index} className='h-[65px] hover:bg-[#D4DFF32B]'>
                <TableCell className="py-0 font-medium"><ArrowIcon color='#005FF8'/></TableCell>
                <TableCell className='py-0'>19:00</TableCell>
                <TableCell >
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
                <TableCell className="text-right"><Grade/> </TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
})
export default TableContent