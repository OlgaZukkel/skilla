import {createMonoHook, useFetch, useLazyFetch} from 'use-mono-hook'
import {useEffect, useState} from 'react'
import {GetListRequest} from "@/types.js";
import {mockFunction} from "utils/mockFunction.js";


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

  return {
    data: data as GetListRequest,
    loading,
    openCalendar,
    setOpenCalendar,
    inOut,
    setInOut,
    filteredData
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
