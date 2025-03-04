import {createMonoHook, useFetch, useLazyFetch} from 'use-mono-hook'
import {useCallback, useEffect, useState} from 'react'
import {GetListRequest} from "@/types.js";
import {mockFunction} from "utils/mockFunction.js";
import {DateRange} from "react-day-picker";
import {DateTime} from "luxon";


const _useGetData = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState(undefined);
  const [sortOrderTimeCall, setSortOrderTimeCall] = useState('asc');
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
  const SortAudio = useCallback(() => {
    return filteredData?.sort((a, b) => sortOrder === 'asc' ? b.time - a.time : a.time - b.time)
  }, [filteredData, sortOrder, setSortOrder]);

  const SortTimeCall = useCallback(() => {
    filteredData?.sort((a, b) => sortOrderTimeCall === 'asc' ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [filteredData, sortOrderTimeCall, setSortOrderTimeCall]);

  useEffect(() => {
    SortAudio();
  }, [sortOrder, setSortOrder,]);

  useEffect(() => {
    SortTimeCall()
  }, [sortOrderTimeCall, setSortOrderTimeCall]);

  return {
    data: data as GetListRequest,
    loading,
    openCalendar,
    setOpenCalendar,
    inOut,
    setInOut,
    filteredData,
    date,
    setDate,
    SortAudio,
    setSortOrder,
    sortOrder,
    sortOrderTimeCall,
    setSortOrderTimeCall,
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
