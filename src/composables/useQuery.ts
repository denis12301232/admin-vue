import { HTTPError } from 'ky';
import { ref, type Ref } from 'vue';

export default function useQuery<T extends (...args: Parameters<T>) => ReturnType<T>>(request: T) {
  const isLoading = ref(false);
  const data = ref<Ref<Awaited<ReturnType<T>>> | null>(null);
  const error = ref<Record<string, string> | null>(null);

  async function query(...args: Parameters<T>) {
    isLoading.value = true;
    Promise.resolve(request(...args))
      .then((result) => (data.value = result))
      .catch((e: HTTPError) => e.response.json().then((data) => (error.value = data)))
      .finally(() => (isLoading.value = false));
  }

  return { data, isLoading, error, query };
}
