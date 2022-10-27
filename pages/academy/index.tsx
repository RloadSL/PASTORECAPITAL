
import dynamic from "next/dynamic";
const Academy = dynamic(() =>
  import('ui/pages/academy/Academy').then((mod) => mod.default)
)

export default Academy;
