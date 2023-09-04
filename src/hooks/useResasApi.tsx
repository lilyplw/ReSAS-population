import useSWR from "swr";

interface PopulationValue {
  year: number;
  value: number;
}

interface PopulationData {
  label: string;
  data: PopulationValue[];
}

interface ApiResponse {
  message: null | string;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
}

// エラー情報を保持するための型
interface FetchError extends Error {
  info?: null | { message: string };
  status?: number;
}

const apiKey: string = import.meta.env.VITE_RESAS_API_KEY as string;

async function fetcher(url: string) {
  const res = await fetch(url, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  if (!res.ok) {
    const error: FetchError = new Error(
      "An error occurred while fetching the data."
    );
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const usePopulationData = (prefCode: number) => {
  const url: string = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;
  const { data, error } = useSWR<ApiResponse, FetchError>(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
