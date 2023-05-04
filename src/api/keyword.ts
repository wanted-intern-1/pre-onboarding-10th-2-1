import React from 'react';
import { isExpired } from 'src/utils/isExpired';

const BASE_URL = '/api/v1/search-conditions';

const needFetch = async (keyword: string) => {
  const url = `${BASE_URL}/?name=${keyword}`;
  const cache = await caches.open('keywords');

  let cachedData = await cache.match(url);
  if (!cachedData) return true;
  if (isExpired(cachedData.headers.get('date'))) return true;
  return false;
};

const formatCache = async (cacheData: Response | undefined) => {
  return await cacheData?.json();
};

const fetchData = async (keyword: string) => {
  if (!keyword) return [];
  const url = `${BASE_URL}/?name=${keyword}`;
  const cache = await caches.open('keywords');
  if (await needFetch(keyword)) await cache.add(url);
  return formatCache(await cache.match(url));
};

const keywordApi = {
  fetchData,
};

export default keywordApi;
