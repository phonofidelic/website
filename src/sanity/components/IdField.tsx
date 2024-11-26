import { useFormValue } from 'sanity'

export function IdField() {
  const id = useFormValue(['_id']) as string
  return <input type="text" value={id} readOnly />
}
