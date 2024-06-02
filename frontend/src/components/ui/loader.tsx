// @ts-nocheck
import { InfinitySpin } from 'react-loader-spinner'


export default function Loader() {
  return (
    <InfinitySpin
  visible={true}
  width="200"
  color="#005998"
  ariaLabel="infinity-spin-loading"
  />
  )
}
