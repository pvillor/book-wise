import { api } from '@/app/lib/axios'

type GetCategoriesResponse = {
  categories: {
    name: string
  }[]
}

export async function getCategories() {
  const { data } = await api.get<GetCategoriesResponse>('/categories')

  return data
}
