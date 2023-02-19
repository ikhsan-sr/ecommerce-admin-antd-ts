import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import useAxios from 'axios-hooks';

import type { FetcherFuncType, UseFetchOption } from './interface';

const useFetchRx = <DT = any, TBody = any>(url: string, options?: UseFetchOption) => {
  const called = useRef(false);
  const {
    variables,
    useCache,
    onCompleted: _,
    onError: _o,
    onFinal: _p1,
    notifyLoading: _1,
    ...restOption
  } = options || {};
  const notifyLoading = useMemo(() => options?.notifyLoading ?? true, [options]);
  const refetched = useRef(false);
  const [hasBeenLoaded, setHasBeenLoaded] = useState(false);

  const memoizedOnCompleted = useMemo(() => options?.onCompleted, [options]);

  const parseVariableToUrl = useCallback(
    (newVariables?: any) => {
      const { limit, offset, ...vars } = { ...variables, ...newVariables } as any;
      const pageLimit = { limit, offset };
      const searchparam = new URLSearchParams();
      Object.entries(pageLimit || {}).forEach(([key, value]) => {
        if (value) searchparam.append(key, value);
      });
      const varKeys = Object.keys({ ...vars, ...pageLimit });
      const arrayFilters: any = [];
      Object.keys(vars).forEach((key) => {
        arrayFilters.push({ [key]: vars[key] });
      });
      const otherFilter = Object.keys(pageLimit).length ? searchparam : '';
      const searchFilter = Object.keys(vars).length ? `s=${JSON.stringify({ $and: arrayFilters })}` : '';
      return `${varKeys.length ? '?' : ''}${searchFilter}${otherFilter}`;
    },
    [variables],
  );

  const urlUsed = useMemo(() => {
    if (!variables) {
      return url;
    }

    return `${url}${parseVariableToUrl()}`;
  }, [url, parseVariableToUrl, variables]);

  const [{ data, loading, error }, doFetch] = useAxios<DT, TBody>(
    {
      url: urlUsed,
      withCredentials: false,
    },
    { ...restOption, ssr: false, useCache: useCache ?? false },
  );
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      if (typeof memoizedOnCompleted === 'function') memoizedOnCompleted(memoizedData);
      called.current = true;
      if (!notifyLoading) {
        setHasBeenLoaded(true);
      }
    }
  }, [memoizedData, notifyLoading, memoizedOnCompleted]);

  // @ts-ignore
  const refetch: FetcherFuncType<DT> = useCallback(
    async (newVariables = {}, restConfig) => {
      try {
        const { data: refetchData } = await doFetch({
          ...restConfig,
          url: newVariables,
        });

        return refetchData;
      } catch (error) {
        return error;
      } finally {
        refetched.current = true;
      }
    },
    [doFetch, url],
  );

  return {
    data,
    loading: loading && !hasBeenLoaded,
    error,
    refetch,
    called: called.current,
    refetched: refetched.current,
  };
};

export default useFetchRx;
