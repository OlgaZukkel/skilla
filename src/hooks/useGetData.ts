import {createMonoHook, useFetch, useLazyFetch} from 'use-mono-hook'
import {useEffect, useState} from 'react'
import {GetListRequest} from "@/types.js";
import {mockFunction} from "utils/mockFunction.js";
import {DateRange} from "react-day-picker";


const _useGetData = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const {data, loading, error} = useFetch({
    url: `https://api.skilla.ru/mango/getList`,
    headers: {'Authorization': 'Bearer testtoken'},
    cache: false,
    method: 'POST',
  });
  const [inOut, setInOut] = useState<any>();
  const filteredData = data?.results?.filter((item) => inOut === undefined ? data.results : item.in_out === inOut);
  const [date, setDate] = useState<DateRange | undefined>(
    /*{
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }*/
  )
  return {
    data: data as GetListRequest,
    loading,
    openCalendar,
    setOpenCalendar,
    inOut,
    setInOut,
    filteredData,
    date,
    setDate
  }
}

export const useGetData = createMonoHook<typeof _useGetData>(_useGetData, {
  defaults: {
    data: undefined,
    loading: true,
    inOut: undefined,
    setOpenCalendar: mockFunction,
  },
}).useHook
