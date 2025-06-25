
import  { CSSProperties,} from 'react'
import { BeatLoader } from 'react-spinners';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#a21caf",
};

interface Props {
    loading:boolean,
    color?:string
}

export default function SpinnerLoad({loading, color="#ffffff"}:Props) {

  return (
    <div className="sweet-loading flex">
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={2}
      />
    </div>
  )
}
