import {createMonoHook, useFetch, useLazyFetch} from 'use-mono-hook'
import {useEffect} from 'react'
import {GetListRequest} from "@/types.js";


const _useGetData = () => {

  const {data, loading, error} = useFetch({
    url: `https://api.skilla.ru/mango/getList`,
    headers: {'Authorization': 'Bearer testtoken'},
    cache: false,
    method: 'POST',
  });


  console.log('data', data)
  return {
    data: data as GetListRequest,
    loading
  }
}

export const useGetData = createMonoHook<typeof _useGetData>(_useGetData, {
  defaults: {
    data: undefined,
    loading: true,
  },
}).useHook
