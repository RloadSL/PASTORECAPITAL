import UnderConstruction from "components/UnderConstruction";
import { env } from "infrastructure/firebase/config";
import Analysis from "ui/pages/analysis/Analysis";
export default env === 'dev' ? Analysis : UnderConstruction