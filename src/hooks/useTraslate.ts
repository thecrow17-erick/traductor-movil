import {useMutation} from '@tanstack/react-query'
import { traslateQuery } from '../query'


export const useTraslate = () => {
  const translate = useMutation({
    mutationFn: traslateQuery
  })

  return {
    ...translate
  }
}
